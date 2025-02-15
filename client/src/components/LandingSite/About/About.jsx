function About() {
  return (
    <div className="w-full min-h-screen px-10 py-20 bg-gray-900 text-gray-300">
      <h1 className="font-bold text-white text-5xl mb-10">
        About Our Platform
      </h1>
      <div className="max-w-5xl mx-auto">
        <p className="text-lg leading-8 mb-8">
          Welcome to our hostel management system, designed to streamline the operations of hostel management and provide convenience for both students and administrators. Our platform bridges the communication gap and ensures efficient management of hostel resources and activities.
        </p>

        <h2 className="text-white font-semibold text-3xl mt-8 mb-4">Key Features</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Student Registration:</strong> Add and manage student information including room allocation and batch details.
          </li>
          <li>
            <strong>Invoice Management:</strong> Generate, view, and manage invoices, including hostel fees and mess bills, with pending and paid status tracking.
          </li>
          <li>
            <strong>Attendance Tracking:</strong> Maintain accurate attendance records for students residing in the hostel.
          </li>
          <li>
            <strong>Complaint Management:</strong> Enable students to submit complaints and track their resolution.
          </li>
          <li>
            <strong>Suggestions:</strong> Allow students to share feedback and suggestions to improve hostel life.
          </li>
          <li>
            <strong>Notifications:</strong> Stay updated with alerts for approved invoices, complaints, and announcements.
          </li>
        </ul>

        <h2 className="text-white font-semibold text-3xl mt-8 mb-4">Student Panel Functionalities</h2>
        <ul className="list-disc pl-5 space-y-3">
          <li>Viewing attendance records.</li>
          <li>Requesting mess off.</li>
          <li>Viewing invoices for hostel and mess fees.</li>
          <li>Making complaints for any issues in the hostel.</li>
          <li>Submitting suggestions to improve the hostel environment.</li>
        </ul>

        <h2 className="text-white font-semibold text-3xl mt-8 mb-4">Why Choose Our Platform?</h2>
        <p className="text-lg leading-8">
          Our system offers an easy-to-use interface with a focus on improving efficiency and transparency in hostel management. By combining advanced technology and security, we ensure that students and administrators can interact seamlessly while minimizing manual work.
        </p>

        <h2 className="text-white font-semibold text-3xl mt-8 mb-4">Vision</h2>
        <p className="text-lg leading-8">
          We aim to revolutionize hostel management by making it modern, efficient, and accessible to everyone involved. Our platform ensures a better experience for students while empowering administrators with the tools they need.
        </p>
      </div>
    </div>
  );
}

export { About };
