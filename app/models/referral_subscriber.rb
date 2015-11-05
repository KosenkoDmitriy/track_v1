class ReferralSubscriber
  def initialize(email, user_email)
    @user_email = user_email
    @email = email
  end

  def call
    return if empty_params
    client.subscribe(id: list_id, email: { email: decode(email) },
                     merge_vars: { REFERRER: decode(user_email) },
                     double_optin: false)
  rescue Gibbon::MailChimpError
    # user may have passed the incorrect email/forgot they
    # previously unsubscribed through an emailer.
    true
  end

  private

  attr_reader :user_email, :email

  def decode(base64_email)
    Base64.urlsafe_decode64(base64_email)
  end

  def empty_params
    (user_email.nil? || user_email.empty?) ||
      (email.nil? || email.empty?)
  end

  def client
    Gibbon::API.lists
  end

  def list_id
    MAILCHIMP_CONFIG['invitee_mail_list']
  end
end
