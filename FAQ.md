# Frequently Asked Questions (FAQ)

## General Questions

### Q: What is this project?
**A:** A complete website for hosting and selling O-Level, A-Level, and IAL past exam papers with integrated bKash payment system for Bangladesh users.

### Q: Is this ready to use?
**A:** Yes! The project is production-ready. Follow the deployment guide to launch.

### Q: How much does it cost to run?
**A:** 
- **Starting out**: $0 (free tiers)
- **Growing**: ~$45/month + bKash transaction fees
- See PROJECT_SUMMARY.md for details

### Q: Do I need coding knowledge?
**A:** 
- To deploy: Basic terminal/command line knowledge
- To use admin panel: No coding needed
- To customize: HTML/CSS/TypeScript knowledge helpful

## Setup Questions

### Q: How long does setup take?
**A:** 
- Database setup: 15 minutes
- Deployment: 5 minutes
- Total: ~20-30 minutes (excluding bKash approval which can take days)

### Q: Can I use this without bKash?
**A:** Yes! You can:
- Make all papers free
- Use only bKash later
- Add other payment gateways

### Q: What if I don't have a bKash merchant account?
**A:** You can still use the site for free papers. Apply for bKash merchant account separately.

### Q: Can I test payments without real money?
**A:** Yes, use bKash sandbox environment for testing.

## Technical Questions

### Q: What technologies are used?
**A:** 
- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Backend: Supabase (PostgreSQL)
- Payments: bKash
- Hosting: Vercel

### Q: Why Next.js?
**A:** 
- Fast performance
- Great SEO
- Easy deployment
- Modern React features
- Built-in optimization

### Q: Why Supabase?
**A:** 
- PostgreSQL database
- Built-in authentication
- File storage included
- Real-time capabilities
- Generous free tier

### Q: Can I use a different database?
**A:** Technically yes, but requires significant code changes. Supabase is recommended.

### Q: Can I self-host instead of Vercel?
**A:** Yes, but Vercel offers the easiest deployment and best performance.

## Feature Questions

### Q: Can users download papers for free?
**A:** Yes, you can set papers as free or premium.

### Q: How do premium payments work?
**A:** 
1. User views premium paper
2. Clicks purchase
3. Redirects to bKash
4. Completes payment
5. Returns to site
6. Can now download

### Q: Can I offer bulk discounts?
**A:** Not built-in yet, but can be added as a custom feature.

### Q: Is there a search function?
**A:** Not yet, but filtering by subject and exam type is available. Search can be added.

### Q: Can users leave reviews?
**A:** Not currently implemented, but can be added.

### Q: Is there a mobile app?
**A:** No, but the website is fully mobile-responsive.

## Admin Questions

### Q: How do I add papers?
**A:** 
1. Log in as admin
2. Go to Admin Panel
3. Click "Add Paper"
4. Upload PDF and cover image
5. Fill in details
6. Submit

### Q: Can I bulk upload papers?
**A:** Not currently, each paper is uploaded individually.

### Q: How do I make someone an admin?
**A:** Run SQL command in Supabase:
```sql
UPDATE user_profiles SET is_admin = true WHERE id = 'user-id';
```

### Q: Can there be multiple admins?
**A:** Yes, set `is_admin = true` for any user.

### Q: How do I edit a paper?
**A:** Admin panel → Papers → Click edit icon → Make changes

### Q: Can I delete papers?
**A:** Yes, via the admin panel (delete icon).

## Payment Questions

### Q: Which payment methods are supported?
**A:** Currently only bKash. Others can be added.

### Q: How do I get bKash credentials?
**A:** 
1. Register at merchant.bka.sh
2. Submit required documents
3. Wait for approval
4. Get credentials from merchant portal

### Q: What are bKash transaction fees?
**A:** Typically 1-2%, check with bKash for exact rates.

### Q: Can customers get refunds?
**A:** The bKash service includes refund capability, but you'll need to implement your refund policy.

### Q: How long do payments take to process?
**A:** Instant - users can download immediately after payment.

### Q: Where do I see payment records?
**A:** In the `purchases` table in Supabase dashboard.

## Content Questions

### Q: What file formats are supported?
**A:** 
- Papers: PDF only
- Covers: JPG, PNG, WebP

### Q: Is there a file size limit?
**A:** 
- Supabase free tier: 1GB total storage
- Individual files: Up to 50MB recommended

### Q: Can I add marking schemes?
**A:** Yes, upload as separate papers or include in the same PDF.

### Q: Can I organize papers by series (May/June, Oct/Nov)?
**A:** Include series in the title or paper_number field.

### Q: How should I name papers?
**A:** Example: "Mathematics May/June 2023 Paper 1"

## Design Questions

### Q: Can I change the colors?
**A:** Yes, edit `tailwind.config.ts` and `app/globals.css`

### Q: Can I change the logo?
**A:** Yes, replace the GraduationCap icon in components

### Q: Is the design mobile-friendly?
**A:** Yes, fully responsive design

### Q: Can I add my own branding?
**A:** Yes, customize colors, logo, and text throughout

## Database Questions

### Q: How do I backup the database?
**A:** Supabase provides automatic backups. Check Settings → Database → Backups

### Q: Can I export my data?
**A:** Yes, use Supabase's export functionality or SQL queries

### Q: What happens if I exceed free tier?
**A:** Upgrade to Supabase Pro ($25/month) or optimize data usage

### Q: How do I reset the database?
**A:** Run migrations again or restore from backup

## Security Questions

### Q: Is user data secure?
**A:** Yes:
- HTTPS encryption
- Hashed passwords
- Row Level Security
- Secure JWT tokens

### Q: Can users see other users' purchases?
**A:** No, RLS policies prevent this

### Q: Are files secure?
**A:** Premium files require authentication and purchase verification

### Q: How do I report a security issue?
**A:** Contact through GitHub issues or email

## Performance Questions

### Q: How fast does the site load?
**A:** Very fast with Vercel's CDN and Next.js optimization

### Q: Can it handle many users?
**A:** Yes, scales automatically with Vercel and Supabase

### Q: How do I improve performance?
**A:** 
- Optimize images before uploading
- Use appropriate image formats
- Enable caching
- Upgrade hosting if needed

## Deployment Questions

### Q: Where can I deploy this?
**A:** Recommended: Vercel. Also works on: Netlify, Railway, self-hosted

### Q: Do I need a custom domain?
**A:** No, Vercel provides a free subdomain. Custom domains are optional.

### Q: How do I add a custom domain?
**A:** In Vercel dashboard: Settings → Domains → Add

### Q: Will it work in Bangladesh?
**A:** Yes, designed specifically for the Bangladesh market with bKash

### Q: Can I deploy multiple instances?
**A:** Yes, create separate projects for staging/production

## Troubleshooting

### Q: "Cannot connect to Supabase"
**A:** 
- Check environment variables
- Verify project isn't paused
- Check Supabase status

### Q: "Permission denied" error
**A:** 
- Check RLS policies
- Verify user is authenticated
- Check admin flag if admin action

### Q: Images not loading
**A:** 
- Verify storage buckets exist
- Check bucket policies
- Ensure URLs are correct

### Q: Payments failing
**A:** 
- Check bKash credentials
- Verify endpoint URL
- Check callback configuration
- Review bKash logs

### Q: Build errors
**A:** 
- Run `npm install`
- Check TypeScript errors
- Clear `.next` folder
- Check environment variables

## Customization Questions

### Q: Can I add more exam types?
**A:** Yes, insert into `exam_types` table

### Q: Can I add more subjects?
**A:** Yes, via admin panel or SQL

### Q: Can I add paper previews?
**A:** Requires custom development

### Q: Can I add a blog?
**A:** Not included, but can be added

### Q: Can I change the homepage?
**A:** Yes, edit `app/page.tsx`

## Business Questions

### Q: Can I sell this to clients?
**A:** Check the license, but generally yes for commercial use

### Q: Can I white-label this?
**A:** Yes, customize branding and colors

### Q: Can I charge for the service?
**A:** Yes, that's the intended use case

### Q: What's a good pricing strategy?
**A:** 
- Free: Popular/older papers
- Premium: Recent papers, ৳50-200 BDT
- Bundles: Discounted sets

## Support Questions

### Q: Where can I get help?
**A:** 
- Read documentation (README, DEPLOYMENT, etc.)
- Check Supabase docs
- Check Next.js docs
- Open GitHub issue

### Q: Is there a community?
**A:** Check project GitHub for discussions

### Q: Can I hire someone to set this up?
**A:** Yes, many developers can help with setup

### Q: What if something breaks?
**A:** 
- Check error logs in Vercel
- Review Supabase logs
- Use rollback feature
- Restore from backup

## Future Development

### Q: Will there be updates?
**A:** Depends on project maintenance. Check GitHub for updates.

### Q: Can I contribute features?
**A:** Yes! Submit pull requests on GitHub

### Q: What features are planned?
**A:** See PROJECT_SUMMARY.md for potential enhancements

### Q: Can I request features?
**A:** Yes, open an issue on GitHub

## Comparison Questions

### Q: How is this different from WordPress?
**A:** 
- Modern tech stack
- Better performance
- Integrated payments
- Purpose-built for past papers

### Q: Why not use Shopify?
**A:** 
- More customizable
- Lower costs
- Better for digital products
- bKash integration

### Q: Advantages over building from scratch?
**A:** 
- Saves months of development
- Tested and secure
- Documentation included
- Best practices implemented

---

## Still Have Questions?

1. **Documentation**: Check README.md, DEPLOYMENT.md, QUICKSTART.md
2. **GitHub Issues**: Open an issue for specific problems
3. **Community**: Check project discussions
4. **Professional Help**: Hire a developer for custom work

**Last Updated**: December 2025
