"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; 

function App() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleStartClick = () => {
    if (isSignedIn) {
      router.push("/workspace"); 
    } else {
      router.push("/sign-in"); 
    }
  };

  return (
    <div className="text-gray-800 font-sans bg-white">

      
      <header className="flex justify-between items-center px-20 py-6 shadow-md">
        <h1 className="text-xl font-bold text-blue-600">AI-Powered Learning</h1>
        <nav className="flex space-x-8 text-gray-700 font-medium">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Explore</a>
          <a href="#">Contact</a>
        </nav>
        <button
          onClick={handleStartClick}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Get started
        </button>
      </header>

      
      <section className="px-20 py-16 text-center">
        <h2 className="text-5xl font-extrabold mb-4">
          Unlock Your Potential with <span className="text-green-500">AI-Powered Learning</span> 
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Experience personalized learning paths, instant feedback, and intelligent insights.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={handleStartClick}
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
          >
            Start
          </button>
          <button className="bg-gray-200 px-6 py-3 rounded font-semibold hover:bg-gray-300">
            Learn More 
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Team working"
          className="w-[70%] mx-auto rounded-lg shadow-lg"
        />
      </section>

      
      <section className="px-20 py-20 bg-white text-center">
        <h3 className="text-3xl font-bold mb-12">Key Features </h3>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-gray-100 p-8 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">AI-Driven Personalization</h4>
            <p>Tailored learning paths based on your progress and goals.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">Instant Feedback</h4>
            <p>Receive immediate feedback on your assignments and quizzes.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded shadow">
            <h4 className="text-xl font-semibold mb-2">Progress Tracking</h4>
            <p>Comprehensive analytics to monitor your learning journey.</p>
          </div>
        </div>
      </section>

      <section className="px-20 py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
        <h3 className="text-3xl font-bold mb-12">How It Works </h3>
        <div className="flex justify-center space-x-10">
          <div className="bg-white text-blue-700 px-8 py-6 rounded shadow w-64">
            <h4 className="text-lg font-bold mb-2">Sign Up</h4>
            <p>Create your free account in minutes.</p>
          </div>
          <div className="bg-white text-blue-700 px-8 py-6 rounded shadow w-64">
            <h4 className="text-lg font-bold mb-2">Explore Courses</h4>
            <p>Browse our vast library of AI-powered content.</p>
          </div>
          <div className="bg-white text-blue-700 px-8 py-6 rounded shadow w-64">
            <h4 className="text-lg font-bold mb-2">Start Learning</h4>
            <p>Begin your personalized learning journey today!</p>
          </div>
        </div>
      </section>

      <section className="px-20 py-20 bg-white text-center">
        <h3 className="text-3xl font-bold mb-12">What Our Users Say </h3>
        <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded shadow text-left">
            <p className="italic mb-4">
              "The AI-powered feedback has been a game-changer for my learning. It's like having a personal tutor!"
            </p>
            <p className="font-semibold">
              John Doe<br />
              <span className="text-sm text-gray-500">Student</span>
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow text-left">
            <p className="italic mb-4">
              "Integrating AI into my teaching has never been easier. The platform is intuitive and powerful."
            </p>
            <p className="font-semibold">
              Jane Smith<br />
              <span className="text-sm text-gray-500">Educator</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-20 py-20 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey? </h3>
        <p className="text-lg mb-6">
          Join thousands of learners achieving their goals with our AI platform.
        </p>
        <button
          onClick={handleStartClick}
          className="bg-white text-purple-700 font-semibold px-8 py-3 rounded hover:bg-gray-100 transition"
        >
          Sign Up
        </button>
      </section>

     
      <footer className="bg-gray-900 text-white px-20 py-12 text-sm">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold mb-4">AI-Powered Learning</h4>
            <p>Empowering the next generation of learners with cutting-edge AI technology.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Explore</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <p>Coming soon...</p>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-400">
          © 2024 AI-Powered Learning Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
