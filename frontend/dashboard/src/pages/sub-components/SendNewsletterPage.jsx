import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendNewsletter } from "@/store/slices/newsletterSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const SendNewsletterPage = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.newsletter);

  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const gotoManageSubscribers = () => navigateTo("/manage/subscribers");
  const gotoManagemessages = () => navigateTo("/manage/newsletter");
  const handleViewNewsletters = () => {
    dispatch(fetchMessages());
    navigateTo("/view-newsletters");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !text.trim()) {
      toast.warn("⚠️ All fields are required!");
      return;
    }

    try {
      const response = await dispatch(sendNewsletter({ subject, text }));
      if (response.payload?.success) {
        toast.success(`✅ Newsletter sent to ${response.payload.message}`);
        setSubject("");
        setText("");
      } else {
        throw new Error(response.payload?.message || "Unknown error");
      }
    } catch (err) {
      toast.error();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-5">
      {/* Buttons Side by Side */}
   

      {/* Form in the Middle */}
      <form className="w-full max-w-lg bg-transparent p-6 rounded-lg shadow-md " onSubmit={handleSubmit}>

        <h2 className="text-2xl font-semibold text-center mb-4 dark:text-gray-100">Send Newsletter</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-100">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 bg-transparent py-2 px-3 text-gray-900 dark:text-gray-100 rounded-md"
            placeholder="Newsletter Subject"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-100">Message</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 bg-transparent py-2 px-3 text-gray-900 dark:text-gray-100 rounded-md"
            placeholder="Newsletter Message"
            rows="6"
          />
        </div>

        {loading ? (
          <SpecialLoadingButton content="Sending..." />
        ) : (
          <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
            Send Newsletter
          </Button>
        )}
      </form>

      {/* Buttons Below the Form */}
      <div className="flex gap-4 mt-5">
        <Button onClick={gotoManageSubscribers} className="bg-blue-500 hover:bg-blue-600">
          Manage Subscribers
        </Button>
        <Button onClick={gotoManagemessages} className="bg-green-500 hover:bg-green-600">
  View Newsletters
</Button>

      </div>
    </div>
  );
};

export default SendNewsletterPage;
