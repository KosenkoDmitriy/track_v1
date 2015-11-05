class ReferringSubscriber < ReferralSubscriber
  def initialize(email)
    @email = email
  end

  def call
    return if email.nil? || email.empty?
    client.subscribe(id: list_id, email: { email: email },
                     merge_vars: { :WOMENS_REFERRER => 'yes' },
                     double_optin: false, update_existing: true)
  end

  private

  attr_reader :email

  def list_id
    MAILCHIMP_CONFIG['main_mail_list']
  end
end
