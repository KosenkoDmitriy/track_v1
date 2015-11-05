Spree::UserRegistrationsController.class_eval do
  def create
    @user = build_resource(spree_user_params)
    @source = params[:spree_user][:source]
    if resource.save
      # Add user to mail list

      sign_up_params = params[:sign_up]
      if sign_up_params
        if sign_up_params[:email_opt_in]
          begin
            @mc.lists.subscribe(MAILCHIMP_CONFIG['main_mail_list'], {:email => @user.email}, nil, 'html', false, false, true, true)
          rescue => e
            logger.warn "Unable to add user to mailchimp #{e}"
          end
        end
      end

      set_flash_message(:notice, :signed_up)
      sign_in(:spree_user, @user)
      session[:spree_user_signup] = true
      associate_user

      if @source == 'signup'
        respond_with resource, location: redirect_back_or_default(alchemy.root_url)
      else
        redirect_to redirect_back_or_default(checkout_path)
      end

    else
      clean_up_passwords(resource)
      render :error
    end
  end

  def redirect_back_or_default(default)
    path = session["spree_user_return_to"]
    session["spree_user_return_to"] = nil
    path || default
  end
end