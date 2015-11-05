require 'csv'

# lib/tasks/prelaunch_coupons_seed.rake
namespace :db do
  namespace :seed do
    desc "Creating Prelaunch Coupons"
    task :prelaunch_coupons_seed => :environment do

      coupons = Array.new
      CSV.foreach("#{Rails.root}/config/data/prelaunch.csv", :headers => true) do |row|
        hash = Hash.new
        hash[:coupon_code] = row[2].to_s
        hash[:class] = row[3].to_s
        coupons.push(hash)
      end

      coupons.each do |coupon|
        code = coupon[:coupon_code]
        level = coupon[:class]
        unless code == "" or level == ""
          coupon = PrelaunchCoupon.all.where(code: code)
          if coupon.empty?
            puts "Adding code #{code} at level #{level}"
            PrelaunchCoupon.create(code: code, level: level, applied: false)
          else
            puts "Updating code #{code} to level #{level}"
            coupon.first.update_attributes({ level: level })
          end
        end
      end
    end
  end
end