---
title: "LearnForge LMS"
order: 5
images:
  - url: "/images/learnforge-lms/instructor_course_dash.png"
    alt: "Instructor dashboard showing course management interface"
  - url: "/images/learnforge-lms/instructor_lesson_dash.png"
    alt: "Lesson editor with rich text formatting tools"
  - url: "/images/learnforge-lms/student_lesson_viewer.png"
    alt: "Student view of lesson content with progress tracking"
---

### LearnForge LMS

#### Summary

A full-stack Learning Management System built with Ruby on Rails 8. Instructors create courses with rich text lessons and image attachments. Learners enroll, track progress, and navigate through content. Features Hotwire for real-time updates, Action Text for rich content editing, and 89% test coverage (75 RSpec examples).

[View the code on GitHub](https://github.com/ajtran303/learnforge-lms/)

---

#### Highlights

- **Authentication & Authorization:** Secure login with bcrypt and role-based access control for Learners and Instructors
- **Rich Text Lesson Editor:** Trix-powered editor with formatting tools, code snippets, and image attachments
- **Course Workflow:** Draft/published states, inline editing with Turbo Frames, and real-time updates
- **Learner Progress Tracking:** Visual progress bars, lesson completion, resume functionality, and enrollment management
- **Real-time UI:** Turbo Stream updates for enrollment, unenrollment, lesson completion, and flash messages
- **Test-Driven Development:** RSpec system and model tests covering all major features
- **Dark Mode Interface:** Custom styled UI with responsive mobile support

---

#### Tech Stack

- **Backend:** Ruby on Rails 8.1, PostgreSQL
- **Frontend:** Hotwire (Turbo), Bootstrap 5
- **Rich Text:** Action Text, Trix Editor, Active Storage
- **Authentication:** bcrypt (has_secure_password)
- **Testing:** RSpec, Capybara, FactoryBot, Shoulda Matchers
- **Deployment:** Render

