// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import emailjs from "@emailjs/browser";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";

import Modal from "../Modal";

const EmailPostModal = (): JSX.Element => {
  const dispatch = useAppThunkDispatch();

  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    console.log("name value", name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const notification = toast.loading("Sending Email...");

    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_email: form.email,
          from_name: form.name,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);

        toast.success("Thanks for joining beta waitlist", {
          id: notification,
        });

        setForm({
          email: "",
          name: "",
        });

        dispatch(setClose("landingEmailPost"));
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);

        toast.error("Something went wrong", {
          id: notification,
        });
      });
    // .finally(() => {
    //   dispatch(setClose("landingEmailPost"));
    // });
  };

  return (
    <Modal modalName='landingEmailPost'>
      <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-black-100 dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#c67391]'>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-6'
        >
          <p className=' text-gray-200 dark:text-white flex flex-grow font-poppins'>
            Join beta waitlist
          </p>
          <div
            onClick={() => {
              setForm({
                email: "",
                name: "",
              });
              dispatch(setClose("landingEmailPost"));
            }}
          >
            <XIcon className=' text-gray-200 h-8 w-8 cursor-pointer dark:text-white' />
          </div>
        </Dialog.Title>

        <div className=' p-2 rounded-lg'>
          <form
            className=' flex flex-col gap-4'
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input
                className='bg-[#151030] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                name='name'
                onChange={handleChange}
                placeholder="What's your name?"
                type='text'
                value={form.name}
              />
            </label>

            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your email</span>
              <input
                className='bg-[#151030] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                name='email'
                onChange={handleChange}
                placeholder="What's your email?"
                type='email'
                value={form.email}
              />
            </label>

            <button
              className={`py-3 px-8 rounded-xl outline-none w-fit  font-bold shadow-md shadow-primary border border-gray-600 ${
                form.email === "" || loading
                  ? "bg-gray-500 text-black cursor-not-allowed"
                  : "text-white bg-tertiary cursor-pointer"
              }`}
              disabled={form.email === "" || loading}
              type='submit'
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default EmailPostModal;
