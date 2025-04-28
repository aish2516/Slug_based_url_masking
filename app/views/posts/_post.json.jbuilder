json.extract! post, :id, :title, :content, :tag, :published_on, :user_id, :created_at, :updated_at
json.url post_url(post, format: :json)
