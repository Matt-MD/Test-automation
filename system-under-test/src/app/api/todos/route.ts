import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const todosFilePath = path.join(dataDir, 'todos.json');

// Helper function to ensure the file exists
const ensureFileExists = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(todosFilePath)) {
    fs.writeFileSync(todosFilePath, JSON.stringify([]));
  }
};

// GET handler to load todos
export async function GET() {
  try {
    ensureFileExists();
    const todosData = fs.readFileSync(todosFilePath, 'utf-8');
    const todos = JSON.parse(todosData);
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error loading todos:', error);
    return NextResponse.json({ error: 'Failed to load todos' }, { status: 500 });
  }
}

// POST handler to save todos
export async function POST(request: NextRequest) {
  try {
    const todos = await request.json();
    ensureFileExists();
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving todos:', error);
    return NextResponse.json({ error: 'Failed to save todos' }, { status: 500 });
  }
}

// DELETE handler to reset todos
export async function DELETE() {
  try {
    ensureFileExists();
    fs.writeFileSync(todosFilePath, JSON.stringify([]));
    return NextResponse.json({ success: true, message: 'Todos reset successfully' });
  } catch (error) {
    console.error('Error resetting todos:', error);
    return NextResponse.json({ error: 'Failed to reset todos' }, { status: 500 });
  }
}
