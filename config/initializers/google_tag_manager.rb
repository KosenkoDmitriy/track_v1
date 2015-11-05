GOOGLE_TAG_MANAGER = YAML.load_file(Rails.root.join('config', 'google_tag_manager.yml'))[Rails.env]
GoogleTagManager.gtm_id = GOOGLE_TAG_MANAGER['container_id']
