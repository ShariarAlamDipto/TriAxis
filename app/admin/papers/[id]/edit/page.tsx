'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPaperPage({ params }: { params: { id: string } }) {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [examTypes, setExamTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    subject_id: '',
    exam_type_id: '',
    year: new Date().getFullYear(),
    title: '',
    paper_number: '',
    description: '',
    is_premium: false,
    price: 0,
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [currentFileUrl, setCurrentFileUrl] = useState('');
  const [currentCoverUrl, setCurrentCoverUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectsRes, examTypesRes, paperRes] = await Promise.all([
        supabase.from('subjects').select('*').order('name'),
        supabase.from('exam_types').select('*').order('name'),
        supabase.from('papers').select('*').eq('id', params.id).single(),
      ]);

      if (subjectsRes.data) setSubjects(subjectsRes.data);
      if (examTypesRes.data) setExamTypes(examTypesRes.data);
      
      if (paperRes.data) {
        const paper = paperRes.data;
        setFormData({
          subject_id: paper.subject_id,
          exam_type_id: paper.exam_type_id,
          year: paper.year,
          title: paper.title,
          paper_number: paper.paper_number || '',
          description: paper.description || '',
          is_premium: paper.is_premium,
          price: paper.price || 0,
        });
        setCurrentFileUrl(paper.file_url);
        setCurrentCoverUrl(paper.cover_image_url || '');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      let fileUrl = currentFileUrl;
      let coverUrl = currentCoverUrl;

      // Upload PDF if changed
      if (pdfFile) {
        const fileName = `${Date.now()}-${pdfFile.name}`;
        const { error: fileError } = await supabase.storage
          .from('papers')
          .upload(fileName, pdfFile);

        if (fileError) throw fileError;

        const { data: { publicUrl } } = supabase.storage
          .from('papers')
          .getPublicUrl(fileName);
        
        fileUrl = publicUrl;
      }

      // Upload Cover if changed
      if (coverFile) {
        const fileName = `${Date.now()}-${coverFile.name}`;
        const { error: coverError } = await supabase.storage
          .from('covers')
          .upload(fileName, coverFile);

        if (coverError) throw coverError;

        const { data: { publicUrl } } = supabase.storage
          .from('covers')
          .getPublicUrl(fileName);
        
        coverUrl = publicUrl;
      }

      // Update paper record
      const { error: updateError } = await supabase
        .from('papers')
        .update({
          ...formData,
          file_url: fileUrl,
          cover_image_url: coverUrl || null,
        })
        .eq('id', params.id);

      if (updateError) throw updateError;

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-theme-primary font-mono">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-theme-muted hover:text-theme-primary flex items-center mb-4 font-mono text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Papers
        </Link>
        <h1 className="text-2xl font-bold text-theme-primary uppercase tracking-wide">Edit Paper</h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mb-6 font-mono text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-panel border border-theme p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
              Subject
            </label>
            <select
              required
              value={formData.subject_id}
              onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
              className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
              Exam Type
            </label>
            <select
              required
              value={formData.exam_type_id}
              onChange={(e) => setFormData({ ...formData, exam_type_id: e.target.value })}
              className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
            >
              <option value="">Select Type</option>
              {examTypes.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
              Year
            </label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
              Paper Number
            </label>
            <input
              type="text"
              value={formData.paper_number}
              onChange={(e) => setFormData({ ...formData, paper_number: e.target.value })}
              placeholder="e.g. Paper 1"
              className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
            Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
          />
        </div>

        <div className="border-t border-theme pt-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="is_premium"
              checked={formData.is_premium}
              onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
              className="rounded border-theme bg-theme text-brand-orange focus:ring-brand-orange"
            />
            <label htmlFor="is_premium" className="ml-2 text-sm text-theme-primary font-mono">
              Premium Paper (Paid)
            </label>
          </div>

          {formData.is_premium && (
            <div>
              <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
                Price (BDT)
              </label>
              <input
                type="number"
                required={formData.is_premium}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full bg-theme border border-theme text-theme-primary px-4 py-2 focus:border-brand-teal focus:outline-none font-mono text-sm"
              />
            </div>
          )}
        </div>

        <div className="border-t border-theme pt-6">
          <div className="mb-4">
            <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
              PDF File
            </label>
            <div className="border-2 border-dashed border-theme rounded-lg p-6 text-center hover:border-brand-teal transition-colors">
              <Upload className="h-8 w-8 text-theme-muted mx-auto mb-2" />
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer text-brand-teal hover:text-brand-orange font-mono text-sm">
                {pdfFile ? pdfFile.name : 'Upload new PDF'}
              </label>
              {currentFileUrl && !pdfFile && (
                <p className="text-xs text-theme-muted mt-2 font-mono">Current file exists</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-theme-muted mb-2 uppercase tracking-wider font-mono">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-theme rounded-lg p-6 text-center hover:border-brand-teal transition-colors">
              <Upload className="h-8 w-8 text-theme-muted mx-auto mb-2" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload" className="cursor-pointer text-brand-teal hover:text-brand-orange font-mono text-sm">
                {coverFile ? coverFile.name : 'Upload new cover'}
              </label>
              {currentCoverUrl && !coverFile && (
                <p className="text-xs text-theme-muted mt-2 font-mono">Current cover exists</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-orange text-white px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-orange-600 transition-all disabled:opacity-50 font-mono"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
