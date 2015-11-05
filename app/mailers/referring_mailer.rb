class ReferringMailer < MandrillMailer::TemplateMailer
  default from: 'support@tracksmith.com'

  def reward(email)
    mandrill_mail template: 'referral-referrer-credit',
                  subject: I18n.t('referral_mailer.rewards.subject'),
                  inline_css: true,
                  to: email
  end
end
