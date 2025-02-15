import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import jsPDF from "jspdf";

function Invoices() {
  const [Progress, setProgress] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);

  const getInvoices = async () => {
    setProgress(30);
    let student = JSON.parse(localStorage.getItem("student")); // Retrieve logged-in student's data
    try {
      const res = await fetch("http://localhost:3000/api/invoice/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student: student._id }),
      });
      setProgress(60);
      const data = await res.json();
      if (data.success) {
        setAllInvoices(data.invoices);

        // Filter pending and paid invoices for the student
        const pending = data.invoices.filter((invoice) => invoice.status.toLowerCase() === "pending");
        const paid = data.invoices.filter((invoice) => invoice.status.toLowerCase() === "approved");

        setPendingInvoices(pending);
        setPaidInvoices(paid);
      } else {
        toast.error(data.errors, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
    setProgress(100);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  // Function to generate and download PDF
  // Function to generate and download PDF
const downloadInvoicePDF = (invoice) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Invoice Details", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Title: ${invoice.title}`, 20, 40);
  doc.text(`Amount: Rs. ${invoice.amount}`, 20, 50);
  doc.text(`Deadline: ${invoice.deadline}`, 20, 60);
  doc.text(`Status: ${invoice.status}`, 20, 70);

  // Add student name and payment date (if available)
  if (invoice.status.toLowerCase() === "approved") {
    const student = JSON.parse(localStorage.getItem("student"));
    doc.text(`Student Name: ${student.name}`, 20, 80);
    doc.text(`Date of Payment: ${invoice.date || "N/A"}`, 20, 90);
  }

  doc.save(`Invoice_${invoice.title}.pdf`);
};


  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <LoadingBar color="#0000FF" progress={Progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-white font-bold text-5xl">My Invoices</h1>
      <p className="text-gray-400 text-lg">View your paid and pending invoices below.</p>

      {/* Invoice Statistics */}
      <div className="flex gap-10 items-center my-5">
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-5xl font-extrabold text-blue-700">{allInvoices.length}</dt>
          <dd className="text-gray-400 text-center">Total Invoices</dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-5xl font-extrabold text-green-600">{paidInvoices.length}</dt>
          <dd className="text-gray-400">Paid Invoices</dd>
        </div>
        <div className="flex flex-col items-center justify-center">
          <dt className="mb-2 text-5xl font-extrabold text-red-500">{pendingInvoices.length}</dt>
          <dd className="text-gray-400">Pending Invoices</dd>
        </div>
      </div>

      {/* Invoice List */}
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl sm:w-[50%] sm:min-w-[500px] w-full mt-5 max-h-96 overflow-auto">
        <span className="text-white font-bold text-xl">Latest Invoices</span>
        <ul role="list" className="divide-y divide-gray-700 text-white">
          {allInvoices.length === 0 ? (
            <p>No invoices found.</p>
          ) : (
            allInvoices.map((invoice) => (
              <li
                className="py-3 px-5 rounded sm:py-4 hover:bg-neutral-700 hover:scale-105 transition-all"
                key={invoice._id}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">{invoice.title}</p>
                    <p className="text-sm truncate text-gray-400">
                      Amount: Rs. {invoice.amount} | Deadline: {invoice.deadline }  |Title: {invoice.title}
                    </p>
                    <p className={`text-sm font-bold ${invoice.status === "approved" ? "text-green-500" : "text-red-500"}`}>
                      {invoice.status.toUpperCase()}
                    </p>
                  </div>
                  {/* Download PDF Button */}
                  <button
                    className={`px-4 py-2 font-semibold text-white rounded-lg ${
                      invoice.status.toLowerCase() === "approved"
                        ? "bg-blue-600 hover:bg-blue-800"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                    disabled={invoice.status.toLowerCase() !== "approved"}
                    onClick={() => downloadInvoicePDF(invoice)}
                  >
                    {invoice.status.toLowerCase() === "approved" ? "Download Invoice" : "Awaiting Approval"}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Invoices;
