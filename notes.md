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