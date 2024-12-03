Book your Professional Therapist
Acupuncturist

seesions now,
no insurance hassle.

Health shouldn't be a puzzle, we are cutting through the B.S to
bring you simple, affordable, and transparent healthcare.

const TEXTS = ['Acupuncture', 'Massage', 'Chiropractor', "Dental",
"Cosmetic", "Dietitian", "Speech Therapist", "Professional
Therapist", "Acupuncturist"];


### global.css ###
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  min-height: 100vh;
}

### tailwind.config.ts ###
backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')

### Prisma Schema
model Category {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  slug        String    @unique
  imageUrl    String?
  demoLink    String?
  description String?
  products    Product[]
 
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
}

model Product {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  title         String
  slug          String   @unique
  price         Float?
  qty           Int?
  imageUrl      String?
  productImages String[]
  features String[]
  description   String?
  categoryId    String   @db.ObjectId
  category      Category @relation(fields: [categoryId], references: [id], onDelete: Cascade, onUpdate: Cascade)
 
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
}


### NavBar links for frontend page
Home
Find Doctors
Services
Telehealth Visits
In-person Visits
About Us
Contact Us
Sign In / Sign up
User Profile

### Basic Informaion for Doctors ###
**Doctor Information**
Fisrt Name
last Name
Middle Name
Date of Birth
Gender
Professional Photo Upload: Allow doctors to upload a professional profile picture.

Bio (optional): provide a text field for doctors to write a brief bio introduction themselves and their practice philosophy
Medical License Number (required for practicing medicine)
Medical License Expiry Date
Years of experience

**Contact Information:**
Email Address (Primary contact)
Phone NUmber (Optional)

**Location:**
Country
City
State/Province
Languages Spoken

### Step 2: Crendentials and Specialization ###
**Education:**

Medical School Name
Graduation Year
Residency Information (Optional)
Fellowship Information (Optional)
Specialization:
Select primary speicalizzation from a pre-defined list
(e.g. Internal Medicine, Pediatrics, Cardiology)
Option to specify additional sub-specialties (if applicable)
Upload copies of board certificates (e.g. Internal Medicine Board)

### Step 3: Practice Details and Availability ###

**Practice Informaiton**
Clinic/Hospital Name
Clinic/Hospital Address
Clinic/Hospital Contact Number
Clinic/Hospital Email Address
Clinic/Hospital Website (if applicable)
Clinic/Hospital Hours of Operation
Services Offered
Insurance Accepted
Languages spoken at the clinic/Hospital

**Availability:**
Set your preferred days and times for appoinments (consider using a calendar
interface for ease of selection)
Indicate availabity for online consultations (telehealth) if applicable
Insurance:
Select which insurance providers you accept (from a pre-defined list)

### Step4: Addional Information ###
Educaiton History
Published Works or Research
any special accomplishments or awards
malpractice Insurance Information (if applicable)
Any additional Documents (CV, Medical Certificate, etc...) Upload

