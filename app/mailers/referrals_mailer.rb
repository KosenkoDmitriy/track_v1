class ReferralsMailer < MandrillMailer::TemplateMailer
  default from: 'support@tracksmith.com'

  def refer(emails, referrer)
    recipients = emails.map { |email| { email: email, name: '' } unless email.empty? }
    mandrill_mail template: 'referral-notifying-invitees',
                  subject: I18n.t('referral_mailer.new.subject'),
                  inline_css: true,
                  to: recipients.compact,
                  vars: {
                    'REFERRER' => referrer
                  },
                  recipient_vars: recipients.compact.map { |recipient| { recipient[:email] =>
                                                        { 'REFERRAL_URL' =>
                                                           build_url(recipient[:email],
                                                                    referrer) } } }
  end

  def build_url(email, referrer)
    safe_email = Base64.urlsafe_encode64(email)
    safe_referrer = Base64.urlsafe_encode64(referrer)
    "http://#{MandrillMailer.configure.default_url_options[:host]}/referrals?email=#{safe_email}&ref=#{safe_referrer}&sub=t"
  end
end
