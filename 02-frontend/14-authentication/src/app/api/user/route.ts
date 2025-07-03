import { NextResponse, NextRequest } from "next/server";

type Role = "AUTHOR" | "READER" | "ADMIN";

interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: Role;
}

const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@mail.com",
    password: "newpass",
    image: "https://i.pravatar.cc/450?img=10",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@mail.com",
    password: "newpass",
    image: "https://i.pravatar.cc/450?img=20",
    role: "AUTHOR",
  },
];

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (email) {
    const userData = mockUsers.find((item) => item.email === email);

    if (userData) {
      return NextResponse.json(userData);
    }

    return NextResponse.json({ error: "USER NOT FOUND" });
  }

  return NextResponse.json(mockUsers);
}

export async function POST() {}
export async function PUT() {}
export async function DELETE() {}

/* ---------------------------------- NOTES --------------------------------- */
// https://purwadhika.com/job-connector/web-development?email=nadhiffuadi@mail.com
