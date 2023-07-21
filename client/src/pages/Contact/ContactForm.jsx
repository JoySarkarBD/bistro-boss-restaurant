import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import TextArea from "../../components/Form/TextArea";
import TextInput from "../../components/Form/TextInput";
import SectionTitle from "../../components/Shared/SectionTitle";

const ContactForm = () => {
  const form = useRef();

  //@ contact form submit function
  const handleContactSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_TAMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.status === 200) {
            form.current.reset();
            toast.success("Your message has been sent, thank you", {
              duration: 3000,
            });
          }
        },
        (error) => {
          toast.success(error.text, { duration: 3000 });
        }
      );
  };

  return (
    <>
      <Toaster />
      <SectionTitle
        subheading='---Send Us a Message---'
        heading='CONTACT FORM'
      />
      <section className='text-gray-600 body-font relative my-12'>
        <div className='container bg-[#F3F3F3] px-5 py-24 mx-auto'>
          <div className='lg:w-1/2 md:w-2/3 mx-auto'>
            <form
              ref={form}
              className='flex flex-wrap -m-2'
              onSubmit={handleContactSubmit}>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <TextInput
                    title='Name'
                    type='text'
                    placeholder='Enter Your Name'
                    name='user_name'
                    required
                  />
                </div>
              </div>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <TextInput
                    title='Email'
                    type='email'
                    placeholder='Enter Your Email'
                    name='user_email'
                    required
                  />
                </div>
              </div>
              <div className='p-2 w-full'>
                <div className='relative'>
                  <TextInput
                    title='Phone'
                    type='number'
                    placeholder='Enter Your Number'
                    name='user_phone'
                    required
                  />
                </div>
              </div>
              <div className='p-2 w-full'>
                <div className='relative'>
                  <TextArea
                    title='Message'
                    placeholder='Write your message here'
                    name='message'
                    required
                  />
                </div>
              </div>
              <div className='p-2 mt-5 w-full'>
                <button
                  className='flex mx-auto text-white bg-[#835D23] border-0 py-3 px-8 focus:outline-none hover:bg-[#9c7130] rounded text-lg items-center gap-x-3'
                  type='submit'>
                  Send Message
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M22.7358 3.29705C22.8078 2.82305 22.6058 2.34805 22.2148 2.06905C21.8238 1.79105 21.3088 1.75605 20.8838 1.97905C17.4828 3.76505 5.58577 10.011 1.93177 11.929C1.48077 12.165 1.21477 12.647 1.25377 13.154C1.29277 13.661 1.62877 14.097 2.11077 14.262C3.53377 14.749 5.27277 15.346 7.99977 16.281L18.9998 6.00005L10.0978 17C13.0058 17.997 17.5528 19.556 18.6938 19.9471C19.0508 20.0701 19.4448 20.0271 19.7678 19.8321C20.0908 19.6361 20.3098 19.3071 20.3668 18.9331L22.7358 3.29705Z'
                      fill='white'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.83154 17.623V20.893C8.83154 21.395 9.12654 21.85 9.58354 22.055C10.0415 22.261 10.5765 22.179 10.9515 21.845L13.7895 19.323L8.83154 17.623Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
