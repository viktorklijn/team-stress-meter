-- Initialize database with default team members
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    stress_level INTEGER NOT NULL DEFAULT 1,
    last_update TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insert default team members
INSERT INTO team_members (name, role, stress_level) VALUES 
('Sarah Chen', 'Product Manager', 5),
('Mike Johnson', 'Frontend Developer', 3),
('Emma Smith', 'UX Designer', 5),
('David Lee', 'Backend Developer', 2),
('Anna Rodriguez', 'QA Engineer', 4),
('James Brown', 'DevOps Engineer', 6)
ON CONFLICT DO NOTHING;