const projectUrl = "https://xdxvkllzwstmrmokdmln.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeHZrbGx6d3N0bXJtb2tkbWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTM4NTIsImV4cCI6MjA3NjcyOTg1Mn0.RS9qWIFBRqO6ganf9gdJapE-4hYzXOK56MJCNzZcKpA"

import { createClient } from "@supabase/supabase-js";
const client = createClient(projectUrl, projectKey)
console.log(client);

export default client