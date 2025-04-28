class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  # before_action :set_post, only: %i[ :update, :destroy ]
  # before_action :authorize_user!, only: %i[ :edit, :update, :destroy ]
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts or /posts.json
  def index
    @posts = Post.all.order(created_at: :desc)
  end

  # GET /posts/1 or /posts/1.json
  def show
    @post = Post.find_by(id: params[:id])
    if @post.nil?
      redirect_to posts_path, alert: "Post not found."
    end
  end

  # GET /posts/new
  def new
    @post = current_user.posts.build  
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @post, notice: "Post created." }
      end
    else
      render :new
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    if @post.update(post_params)
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @post, notice: "Post updated." }
      end
    else
      render :edit
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to posts_path, notice: "Post deleted." }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  def authorize_user!
    redirect_to posts_path, alert: "Not authorized" unless @post.user == current_user
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :content, :tag, :published_on)  end
end
