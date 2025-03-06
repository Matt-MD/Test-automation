'use client'

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section aria-labelledby="about-heading" className="mb-10">
        <h2 id="about-heading" className="text-2xl font-semibold mb-4">About Our App</h2>
        <p className="text-gray-700 leading-relaxed">
          This is a simple application built with Next.js and React. It demonstrates
          basic routing and state management in a modern web application.
        </p>
      </section>

      <section aria-labelledby="features-heading" className="mb-10">
        <h2 id="features-heading" className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Simple and intuitive user interface</li>
          <li>Todo list management with add, delete, and toggle functionality</li>
          <li>Basic user authentication</li>
          <li>Responsive design that works on all devices</li>
        </ul>
      </section>

      <section aria-labelledby="get-started-heading">
        <h2 id="get-started-heading" className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-700 mb-4">
          Ready to organize your tasks? Click the button below to start using our Todo application.
        </p>
        <Link
          href="/todo"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          aria-label="Start using the Todo app"
        >
          Go to Todo App
        </Link>
      </section>
    </main>
  );
}