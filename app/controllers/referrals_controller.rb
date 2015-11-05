class ReferralsController < Spree::StoreController
  def index
  end

  def new
  end

  def create
    ReferringMailer.reward(referral_params['referring']).deliver
    ReferralsMailer.refer(referral_emails.values,
                          referral_params['referring']).deliver
    referrer = ReferringSubscriber.new(referral_params['referring'])
    referrer.call
    respond_to do |with|
      with.html { redirect_to root_path, notice: t('referral_mailer.new.flash') }
      with.json { render nothing: true, status: :created }
    end
  end

  def subscribe
    subscriber = ReferralSubscriber.new(referral_params['referred'],
                                        referral_params['referring'])
    subscriber.call
    respond_to do |with|
      with.html { redirect_to root_path, notice: t('referral_mailer.subscribe.flash') }
      with.json { render nothing: true, status: :created }
    end
  end

  private

  def referral_emails
    referral_params.keep_if { |key| key =~ /email/ }
  end

  def referral_params
    params.require(:referral).permit(:email1, :email2, :email3, :referred, :referring)
  end
end
