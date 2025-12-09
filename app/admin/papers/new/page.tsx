'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function NewPaperPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [examTypes, setExamTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isManualSubject, setIsManualSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    subject_id: '',
    exam_type_id: '',
    year: new Date().getFullYear(),
    title: '',
    paper_number: '',
    description: '',
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [subjectsRes, examTypesRes] = await Promise.all([
      supabase.from('subjects').select('*').order('name'),
      supabase.from('exam_types').select('*').order('name'),
    ]);

    if (subjectsRes.data) setSubjects(subjectsRes.data);
    if (examTypesRes.data) setExamTypes(examTypesRes.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let subjectId = formData.subject_id;

      if (isManualSubject) {
        if (!newSubjectName.trim()) throw new Error('Subject name is required');
        
        // Create new subject
        const { data: newSubject, error: subjectError } = await supabase
          .from('subjects')
          .insert({ name: newSubjectName.trim() })
          .select()
          .single();

        if (subjectError) throw subjectError;
        subjectId = newSubject.id;
      } else {
        if (!subjectId) throw new Error('Please select a subject');
      }

      let fileUrl = '';
      let coverUrl = '';

      // Upload PDF
      if (pdfFile) {
        const fileName = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('papers')
          .upload(fileName, pdfFile);

        if (fileError) {
            console.error('PDF Upload Error:', fileError);
            throw new Error(`Failed to upload PDF: ${fileError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('papers')
          .getPublicUrl(fileName);
        
        fileUrl = publicUrl;
      }

      // Upload Cover
      if (coverFile) {
        const fileName = `${Date.now()}-${coverFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data: coverData, error: coverError } = await supabase.storage
          .from('covers')
          .upload(fileName, coverFile);

        if (coverError) {
            console.error('Cover Upload Error:', coverError);
            throw new Error(`Failed to upload cover: ${coverError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('covers')
          .getPublicUrl(fileName);
        
        coverUrl = publicUrl;
      }

      // Insert paper record
      const { error: insertError } = await supabase.from('papers').insert({
        ...formData,
        subject_id: subjectId,
        file_url: fileUrl,
        cover_image_url: coverUrl || null,
      });

      if (insertError) {
          console.error('Database Insert Error:', insertError);
          throw new Error(`Failed to save paper details: ${insertError.message}`);
      }

      // Show success message and redirect
      alert('Paper added successfully!');
      router.refresh();
      router.push('/admin');
    } catch (err: any) {
      console.error('Error adding paper:', err);
      setError(err.message || 'Failed to add paper');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-theme-primary mb-6">Add New Paper</h1>

      {error && (
        <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-panel rounded-lg shadow-sm p-6 space-y-6 border border-theme">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Subject *
            </label>
            {!isManualSubject ? (
              <div className="space-y-2">
                <select
                  required={!isManualSubject}
                  value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                  className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsManualSubject(true)}
                  className="text-xs text-brand-orange hover:underline"
                >
                  + Add New Subject
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  required={isManualSubject}
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="Enter new subject name"
                  className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
                />
                <button
                  type="button"
                  onClick={() => setIsManualSubject(false)}
                  className="text-xs text-theme-muted hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Exam Type *
            </label>
            <select
              required
              value={formData.exam_type_id}
              onChange={(e) => setFormData({ ...formData, exam_type_id: e.target.value })}
              className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
            >
              <option value="">Select Exam Type</option>
              {examTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Year *
            </label>
            <input
              type="number"
              required
              min="1990"
              max="2030"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Paper Number
            </label>
            <input
              type="text"
              value={formData.paper_number}
              onChange={(e) => setFormData({ ...formData, paper_number: e.target.value })}
              placeholder="e.g. Paper 1, Paper 2"
              className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-theme-secondary mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Mathematics May/June 2023"
            className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-theme-secondary mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-theme border border-theme rounded-lg focus:ring-2 focus:ring-primary text-theme-primary"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              PDF File *
            </label>
            <div className="border-2 border-dashed border-theme rounded-lg p-4 text-center hover:border-primary transition-colors">
              <Upload className="h-8 w-8 text-theme-muted mx-auto mb-2" />
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <span className="text-sm text-primary hover:underline">
                  {pdfFile ? pdfFile.name : 'Choose PDF file'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-secondary mb-2">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-theme rounded-lg p-4 text-center hover:border-primary transition-colors">
              <Upload className="h-8 w-8 text-theme-muted mx-auto mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload" className="cursor-pointer">
                <span className="text-sm text-primary hover:underline">
                  {coverFile ? coverFile.name : 'Choose cover image'}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Paper'}
          </button>
        </div>
      </form>
    </div>
  );
}
