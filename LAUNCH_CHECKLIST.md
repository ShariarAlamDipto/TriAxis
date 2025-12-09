# Production Launch Checklist

Use this checklist to ensure everything is ready before going live.

## Pre-Launch Checklist

### ☐ Database Setup
- [ ] Supabase project created
- [ ] All migrations run successfully
- [ ] Storage buckets created (papers, covers)
- [ ] Storage policies configured
- [ ] Test data added
- [ ] Backup strategy confirmed

### ☐ Authentication
- [ ] Email confirmation enabled (Settings → Auth → Email)
- [ ] Password requirements set (min 6 characters)
- [ ] JWT expiry configured
- [ ] Test user registration
- [ ] Test login/logout
- [ ] Admin user created

### ☐ Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set (keep secret!)
- [ ] `BKASH_APP_KEY` set
- [ ] `BKASH_APP_SECRET` set
- [ ] `BKASH_USERNAME` set
- [ ] `BKASH_PASSWORD` set
- [ ] `BKASH_BASE_URL` set to production endpoint
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain

### ☐ bKash Payment
- [ ] Merchant account approved
- [ ] Production credentials obtained
- [ ] Sandbox testing completed
- [ ] Test small real payment
- [ ] Payment callback URL configured
- [ ] Success/failure flows tested
- [ ] Transaction records verified

### ☐ Content
- [ ] Subjects added
- [ ] Initial papers uploaded
- [ ] Cover images optimized
- [ ] PDF files validated
- [ ] Free papers available
- [ ] Premium papers priced

### ☐ Pages & Features
- [ ] Homepage loads correctly
- [ ] Browse page filters work
- [ ] Paper detail pages display properly
- [ ] Login/registration functional
- [ ] Dashboard shows purchases
- [ ] Admin panel accessible
- [ ] File uploads work
- [ ] Downloads work

### ☐ Design & UX
- [ ] Mobile responsive
- [ ] Images load properly
- [ ] Navigation intuitive
- [ ] Forms validate correctly
- [ ] Error messages clear
- [ ] Loading states present
- [ ] Accessibility checked

### ☐ Security
- [ ] RLS enabled on all tables
- [ ] Admin checks in place
- [ ] Service role key never exposed to client
- [ ] HTTPS enabled
- [ ] Environment variables not in git
- [ ] File upload restrictions set
- [ ] Rate limiting considered

### ☐ Performance
- [ ] Images optimized
- [ ] Lighthouse score checked
- [ ] Page load times acceptable
- [ ] Database queries optimized
- [ ] CDN working
- [ ] Caching configured

### ☐ Legal & Documentation
- [ ] Terms of Service page
- [ ] Privacy Policy page
- [ ] Cookie policy (if applicable)
- [ ] Refund policy
- [ ] Contact information
- [ ] About page

### ☐ Deployment
- [ ] Code pushed to GitHub
- [ ] Imported to Vercel
- [ ] Environment variables added
- [ ] Build successful
- [ ] Domain configured
- [ ] SSL certificate active

### ☐ Monitoring & Analytics
- [ ] Error tracking setup (optional: Sentry)
- [ ] Analytics installed (optional: Google Analytics)
- [ ] Supabase logs reviewed
- [ ] Vercel logs accessible

### ☐ Testing
- [ ] Register new user
- [ ] Browse papers
- [ ] View paper details
- [ ] Purchase premium paper
- [ ] Complete bKash payment
- [ ] Download purchased paper
- [ ] Admin: Add subject
- [ ] Admin: Upload paper
- [ ] Test on mobile device
- [ ] Test on different browsers

## Launch Day

### ☐ Final Checks
- [ ] All checklist items above completed
- [ ] Production environment variables verified
- [ ] bKash in production mode
- [ ] Database backup created
- [ ] Team notified
- [ ] Support email ready

### ☐ Go Live
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test critical paths
- [ ] Monitor for errors
- [ ] Check payment flow
- [ ] Verify emails sending

### ☐ Post-Launch (First Hour)
- [ ] Monitor error logs
- [ ] Check user registrations
- [ ] Verify payments processing
- [ ] Test customer journey
- [ ] Check performance metrics

### ☐ Post-Launch (First Day)
- [ ] Review analytics
- [ ] Check for issues
- [ ] Respond to feedback
- [ ] Monitor payment success rate
- [ ] Verify email deliverability

### ☐ Post-Launch (First Week)
- [ ] Analyze user behavior
- [ ] Review payment data
- [ ] Check for bugs
- [ ] Gather user feedback
- [ ] Plan improvements

## Emergency Contacts

**Vercel Support**: support@vercel.com  
**Supabase Support**: support@supabase.com  
**bKash Merchant Support**: [Check merchant portal]

## Rollback Plan

If critical issues occur:

1. **Revert Deployment**: Use Vercel dashboard to rollback
2. **Disable Payments**: Set all papers to free temporarily
3. **Notify Users**: Post notice on homepage
4. **Fix Issues**: Test in staging
5. **Redeploy**: Once fixed and tested

## Common Launch Issues

### Users can't register
- Check email confirmation settings
- Verify Supabase Auth is enabled
- Check email provider configuration

### Payments failing
- Verify bKash credentials
- Check callback URL is correct
- Ensure using production endpoint
- Review bKash merchant dashboard

### Images not loading
- Check storage bucket policies
- Verify CDN URLs are correct
- Check Next.js image config

### Admin can't upload
- Verify admin flag set correctly
- Check storage policies
- Check file size limits

## Success Metrics

Track these after launch:

- **User Registrations**: Target per week
- **Paper Views**: Most popular subjects
- **Purchase Conversion**: % of viewers who buy
- **Payment Success Rate**: Should be >95%
- **Average Order Value**: Track trends
- **User Retention**: Return visitors

## Optimization Opportunities

After launch, consider:

- A/B test pricing
- Add search functionality
- Implement paper previews
- Add bulk purchase discounts
- Create email marketing campaigns
- Add social sharing
- Implement referral program
- Add more payment methods
- Create mobile app

---

## Sign-Off

**Completed by**: ________________  
**Date**: ________________  
**Launch Time**: ________________  
**Domain**: ________________  

**Notes**:
_________________________________
_________________________________
_________________________________

---

**🎉 Ready to Launch!**

Once all items are checked, you're ready to go live. Good luck!
