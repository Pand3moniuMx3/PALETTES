import { useState } from "react";
import Badge from "../components/Badge";
import "../styles/About.css";
import SquareBtn from "../components/SquareBtn";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [isTofOpen, setIsTofOpen] = useState(false);

  return (
    <section className="about">
      <TableOfContents isTofOpen={isTofOpen} setIsTofOpen={setIsTofOpen} />
      <Content setIsTofOpen={setIsTofOpen} />
    </section>
  );
}

function TableOfContents({ isTofOpen, setIsTofOpen }) {
  return (
    <aside className={`tof ${isTofOpen && "open"}`}>
      <div className="btn-container">
        <img
          src="/icons/close-icon.svg"
          alt="close table of contents"
          onClick={() => setIsTofOpen(false)}
        />
      </div>
      <div className="category first">
        <b>Introduction</b>
        <div className="items">
          <a href="#about-palettes">About palettes</a>
          <a href="#creator">Creator</a>
        </div>
      </div>
      <div className="category">
        <b>Usage</b>
        <div className="items">
          <a href="#account-actions">Account actions</a>
          <a href="#creating-palettes">Creating palettes</a>
        </div>
      </div>
      <div className="category">
        <b>Docs</b>
        <div className="items">
          <a href="#libraries">Libraries</a>
          <a href="#source-code">Source code</a>
        </div>
      </div>
    </aside>
  );
}

function Content({ setIsTofOpen }) {
  const navigate = useNavigate();

  return (
    <main className="content">
      <div className="btn-container">
        <SquareBtn
          type="secondary"
          icon="/icons/home-icon.svg"
          alt="back to home"
          onClick={() => navigate("/")}
        />
        <div style={{ display: "flex", gap: "var(--inner-gap)" }}>
          <SquareBtn
            type="secondary"
            icon="/icons/login-icon.svg"
            alt="log in"
            onClick={() => navigate("/login")}
          />
          <SquareBtn
            type="secondary"
            icon="/icons/burger-icon.svg"
            alt="open table of contents"
            onClick={() => setIsTofOpen(true)}
            customClass="tof-btn"
          />
        </div>
      </div>
      <div className="topic">
        <h2>Welcome to Palettes</h2>
        <div className="chapter" id="about-palettes">
          <h3>About Palettes</h3>
          <p>
            Palettes is a React application which aims to help Web Devs find and
            keep track of different color palettes they use throughout their
            projects. The app started out as a personal project to practice
            React. However, I liked it so much, that I decided to share it.
            Palettes lets web devs and designers find, create, use and store
            color schemes - a necessity for every web project.
          </p>
        </div>
        <div className="chapter" id="creator">
          <h3>Creator</h3>
          <p>
            My name is Matt, but you can find me on github at{" "}
            <a href="https://github.com/Pand3moniuMx3">@Pand3moniuMx3</a>. I'm a
            novice React dev, with some experience in JavaScript. I care about
            web design and always make sure my apps not only work, but also look
            great. After a year of forgetting my clients' hex codes and having
            to dig through emails to find them, I decided to create a place
            where I could store all the colors I use. This is how Palettes was
            born. It's my first full-stack application - I know it's not
            perfect. I would love to listen to any constructive feedback about
            this app.
          </p>
        </div>
      </div>
      <div className="topic">
        <h2>Usage</h2>
        <div className="chapter" id="account-actions">
          <h3>Account actions</h3>
          <p>
            Palette profiles are almost entirely customizable. However, they're
            not public, so only you can view your profile information. You can
            easily edit your profile information by logging into the
            application, opening your profile, and toggling the "Edit" view.
            After saving your changes, they'll be uploaded to the database, and
            your profile will be updated shortly.
          </p>
          <p>
            Unfortunately, as for now, the only way to delete your account is by
            reaching out to me via email and requesting it personally.
          </p>
          <div className="img-wrapper">
            <img src="/images/account-actions-ref.PNG" alt="account actions" />
          </div>
          <div className="details">
            <p>Customizable details:</p>
            <Badge>password</Badge>
            <Badge>username</Badge>
            <Badge>occupation</Badge>
            <Badge>profile picture</Badge>
          </div>
          <div className="details">
            <p>Non-customizable details:</p>
            <Badge>user email</Badge>
            <Badge>acc creation date</Badge>
          </div>
        </div>
        <div className="chapter" id="creating-palettes">
          <h3>Creating palettes</h3>
          <p>
            Creating new palettes can be a confusing process at first, so make
            sure to understand it first. All palettes receive 13 properties. 10
            of them are customizable, while the rest are defined automatically.
            Let's go through them one by one:
          </p>
          <p>
            <Badge customClass="property nc">id</Badge>
            is set automatically when you create a new palette. It's an int4
            incremental ID, and cannot be changed during any stage of a
            palette's lifespan.
          </p>
          <p>
            <Badge customClass="property c">title</Badge>
            is the 1st customizable property. It's meant to help users
            understand the general concept or use behind a palette. It's also
            not unique.
          </p>
          <p>
            <Badge customClass="property nc">createdAt</Badge>
            is a non-customizable property. It's automatically assigned to a new
            palette, and contains the current date in the mm-dd-yyyy format.
          </p>
          <p>
            <Badge customClass="property c">background</Badge>
            is customizable, and also the 1st of 5 color properties. It
            describes the main background color of a palette. Accepts hex codes.
            Required.
          </p>
          <p>
            <Badge customClass="property c">main</Badge>
            is customizable, and also the 2nd of 5 color properties. It serves
            as the primary contrasting color, often used for key elements.
            Accepts hex codes. Required.
          </p>
          <p>
            <Badge customClass="property c">text</Badge>
            is customizable, and also the 3rd of 5 color properties. It
            determines the color of text in a palette. Accepts hex codes.
            Required.
          </p>
          <p>
            <Badge customClass="property c">theme</Badge>
            is customizable, and also the 4th of 5 color properties. It
            represents the dominant accent color in a palette. Accepts hex
            codes. Optional.
          </p>
          <p>
            <Badge customClass="property c">light</Badge>
            is customizable, and also the 5th of 5 color properties. It provides
            a softer or lighter variation of the theme color. Accepts hex codes.
            Optional.
          </p>
          <p>
            <Badge customClass="property nc">author</Badge>
            is the last non-customizable property. It's automatically assigned
            to every new palette, and contains the username of it's creator.
          </p>
          <p>
            <Badge customClass="property c">lightness</Badge>
            is the 1st of 3 customizable category properties. Accepts "light" or
            "dark". It helps categorize palettes based on their overall
            brightness. Required.
          </p>
          <p>
            <Badge customClass="property c">hue</Badge>
            is the 2nd of 3 customizable category properties. Accepts
            "monochrome" or "coloured". It determines whether the palette is
            greyscale, or full-color. Required.
          </p>
          <p>
            <Badge customClass="property c">saturation</Badge>
            is the 3rd of 3 customizable category properties. Accepts "vibrant"
            or "muted". It describes the intensity and vividness of a palette.
            Required.
          </p>
          <p>
            <Badge customClass="property c">isPublic</Badge>
            is the last property. It regulates whether other users can view the
            palette or no. It's set to "private" by default, but can be changed
            to "public". Required.
          </p>
          <div className="img-wrapper">
            <img
              src="/images/creating-palettes-ref.PNG"
              alt="palette workshop default view"
            />
          </div>
        </div>
      </div>
      <div className="topic">
        <h2>Documentation</h2>
        <div className="chapter" id="libraries">
          <h3>Libraries</h3>
          <p>
            "Palettes" is built in React.js, but it couldn't have been possible
            without the help of people smarter than me. Here is a list of
            external libraries and services I used on this project, and what
            for:
          </p>
          <p>
            <Badge customClass="library">
              <a href="https://reactrouter.com/">React Router DOM</a>
            </Badge>
            which I used to split components between different pages.
          </p>
          <p>
            <Badge customClass="library">
              <a href="https://tanstack.com/query/latest/docs/framework/react/overview">
                React Query
              </a>
            </Badge>
            which I used to manage external state globally throughout the
            application.
          </p>
          <p>
            <Badge customClass="library">
              <a href="https://www.reactbits.dev/?ref=dailydev">React Bits</a>
            </Badge>
            which I used for the iridescent background effect on the homepage.
          </p>
          <p>
            <Badge customClass="library">
              <a href="https://vite.dev/">Vite</a>
            </Badge>
            which makes the app run extremely fast and reliably.
          </p>
          <p>
            <Badge customClass="library">
              <a href="https://supabase.com/">Supabase</a>
            </Badge>
            which I used to create authentication, external databases and a
            userbase.
          </p>
        </div>
        <div className="chapter" id="source-code">
          <h3>Source Code</h3>
          <p>
            I always intented for the "Palettes" project to be open source, as
            it's main goal is helping fellow web developers. I hope this code
            helps you build a new application or fix existing errors.
          </p>
          <a href="#" className="btn secondary">
            Github
          </a>
        </div>
      </div>
    </main>
  );
}
