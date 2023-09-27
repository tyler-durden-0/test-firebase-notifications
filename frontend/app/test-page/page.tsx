"use client";
import {fetchToken, onMessageListener} from '../firebase';
import { useState, useEffect } from 'react';

const MyComponent = () => {

  const [token, setToken] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [recievedNotificationText, setRecievedNotificationText] = useState('');
  useEffect(() => {console.log('token', token)}, [token])
  fetchToken(setToken);

  onMessageListener().then((payload: any) => {
    setShowNotification(true);
    setRecievedNotificationText(payload.data.text)
    console.log('payload from firebase messaging', payload);
  }).catch(err => console.log('failed: ', err));

  useEffect(() => {
    const init = async () => {
      const { Alert, Input, initTE } = await import("tw-elements");
      initTE({ Alert, Input });
    };
    init();
  }, []);

  const postNewNotificationText = (token: string, notificationText: string) => {
    const postData = {
      fcmToken: token,
      text: notificationText
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };


    fetch('http://localhost:3001/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
      })
  } 

  const handleNotificationText = (e: any) => {
    setNotificationText(e.target.value);
  }

  const onButtonClicked = () => {
    postNewNotificationText(token, notificationText);
  }

  const onButtonCloseNotificationClicked = () => {
    setShowNotification(false);
  }

  return (
    <>
    <div className="h-screen flex flex-col items-center justify-center gap-4">      
      <div className="relative mb-3" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="exampleFormControlInputText"
          value={notificationText}
          onChange={handleNotificationText}
          placeholder="Input notification text" />
        <label
          htmlFor="exampleFormControlInputText"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >Notification Input
        </label>
      </div>
      <button
        type="button"
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={onButtonClicked}>
        Generate notification
      </button>
      {showNotification ? <div
        className="mb-3 hidden w-full items-center rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800 data-[te-alert-show]:inline-flex"
        role="alert"
        data-te-alert-init
        data-te-alert-show>
          {recievedNotificationText}.
          <button
            type="button"
            className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-alert-dismiss
            aria-label="Close"
            onClick={onButtonCloseNotificationClicked}>
            <span
              className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6">
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div> : <div></div>}
    </div>
      </>
  );
};

export default MyComponent;