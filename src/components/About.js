import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="border border-primary rounded p-3">
        <h1 className="text-primary">About Us</h1>
        <p>
          We are five students collaborating to develop a web application as part of our courses in project management and web development. Our goal is to create a user-friendly and functional web application by applying agile methods and working efficiently together.
        </p>
        <h2>Group Members:</h2>
        <ul>
          <li>Alexander Doja</li>
          <li>Yarub</li>
          <li>Efrem Ghebre</li>
          <li>Zia Nourozi</li>
          <li>Erik</li>
        </ul>
        <h2>Project Goals:</h2>
        <ul>
          <li>Create a user-friendly web application.</li>
          <li>Utilize agile methods for effective work.</li>
          <li>Enhance our skills in web development through collaboration.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;