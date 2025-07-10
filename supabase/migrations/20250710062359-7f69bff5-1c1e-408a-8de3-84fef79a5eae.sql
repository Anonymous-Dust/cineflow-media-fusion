
-- Create enum types
CREATE TYPE content_type AS ENUM ('movie', 'tv_show');
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'expired');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  subscription_status subscription_status DEFAULT 'inactive',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create genres table
CREATE TABLE public.genres (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  tmdb_id INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content table for movies and TV shows
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tmdb_id INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  overview TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  release_date DATE,
  vote_average DECIMAL(3,1),
  vote_count INTEGER,
  runtime INTEGER,
  content_type content_type NOT NULL,
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT FALSE,
  video_url TEXT,
  trailer_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_genres junction table
CREATE TABLE public.content_genres (
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES public.genres(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, genre_id)
);

-- Create watchlist table
CREATE TABLE public.watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Create watch_history table
CREATE TABLE public.watch_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0, -- in seconds
  completed BOOLEAN DEFAULT FALSE
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for content (public read, admin write)
CREATE POLICY "Anyone can view active content" ON public.content
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage content" ON public.content
  FOR ALL USING (public.get_current_user_role() IN ('admin', 'moderator'));

-- RLS Policies for genres (public read, admin write)
CREATE POLICY "Anyone can view genres" ON public.genres
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage genres" ON public.genres
  FOR ALL USING (public.get_current_user_role() IN ('admin', 'moderator'));

-- RLS Policies for content_genres
CREATE POLICY "Anyone can view content genres" ON public.content_genres
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage content genres" ON public.content_genres
  FOR ALL USING (public.get_current_user_role() IN ('admin', 'moderator'));

-- RLS Policies for user-specific tables
CREATE POLICY "Users can manage their own watchlist" ON public.watchlist
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own watch history" ON public.watch_history
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- Admins can view all user data
CREATE POLICY "Admins can view all watchlists" ON public.watchlist
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can view all watch history" ON public.watch_history
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can view all favorites" ON public.favorites
  FOR SELECT USING (public.get_current_user_role() = 'admin');

-- Create trigger function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some initial genres
INSERT INTO public.genres (name, tmdb_id) VALUES
('Action', 28),
('Adventure', 12),
('Animation', 16),
('Comedy', 35),
('Crime', 80),
('Documentary', 99),
('Drama', 18),
('Family', 10751),
('Fantasy', 14),
('History', 36),
('Horror', 27),
('Music', 10402),
('Mystery', 9648),
('Romance', 10749),
('Science Fiction', 878),
('TV Movie', 10770),
('Thriller', 53),
('War', 10752),
('Western', 37);

-- TV Show genres
INSERT INTO public.genres (name, tmdb_id) VALUES
('Action & Adventure', 10759),
('Kids', 10762),
('News', 10763),
('Reality', 10764),
('Sci-Fi & Fantasy', 10765),
('Soap', 10766),
('Talk', 10767),
('War & Politics', 10768);
