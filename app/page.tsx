import { createUserMessage, deleteUserMessage } from "./actions";
import { db } from "./db";
import { getSession } from "@auth0/nextjs-auth0/edge";

async function getUserMessage() {
  const session = await getSession();
  if (!session) return null;

  return db.query.UserMessages.findFirst({
    where: (messages, { eq }) => eq(messages.user_id, session.user.sub),
  });
}

function LoginBox() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <a
        href="/api/auth/login"
        className="rounded-md bg-[#00E699] px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-[#00e5BF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E699]"
      >
        Log in
      </a>
    </main>
  );
}

export default async function Home() {
  const session = await getSession();
  const existingMessage = await getUserMessage();

  if (!session) {
    return <LoginBox />;
  }

  const ui = existingMessage ? (
    <div className="w-2/3 text-center">
      <h1 className="text-3xl">{existingMessage.message}</h1>
      <form
        action={deleteUserMessage}
        className="w-full rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="w-full text-center">
          <input
            type="submit"
            value={"Delete Quote"}
            className="bg-[#00E699] transition-colors hover:bg-[#00e5BF] text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none cursor-pointer"
          />
        </div>
      </form>
    </div>
  ) : (
    <form action={createUserMessage} className="shadow-md w-2/3 rounded px-8">
      <div className="mb-6">
        <input
          type="text"
          name="message"
          placeholder="Mistakes are the portals of discovery - James Joyce"
          className="text-center appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none"
        />
      </div>
      <div className="w-full text-center">
        <input
          type="submit"
          value={"Save Quote"}
          className="bg-[#00E699] cursor-pointer transition-colors hover:bg-[#00e5BF] text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
        />
      </div>
    </form>
  );

  return (
    <main className="flex -mt-16 min-h-screen flex-col align-center justify-center items-center px-24">
      <h2 className="text-2xl pb-6 text-gray-400">
        {existingMessage
          ? "Your quote is wonderful..."
          : "Save an inspiring quote for yourself..."}
      </h2>
      {ui}
    </main>
  );
}
