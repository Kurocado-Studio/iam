import * as React from 'react';

export function Welcome(): React.ReactNode {
  return (
    <main className='bg-white'>
      <article className='mx-auto max-w-2xl px-6 py-24 text-center sm:px-6 sm:py-32 lg:px-8'>
        <h1 className='text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
          Kurocado Studio IAM
        </h1>
        <p className='mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600'>
          An application to test the integration with Auth0 by Okta
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <a
            href='https://auth0.com'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Learn more about Auth0 by Okta
          </a>
        </div>
      </article>
    </main>
  );
}
