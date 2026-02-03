# CS 260 Notes
Here is a modification because I already know how to use git.

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 100.28.122.201

I first hooked in everything before I actually got the domain and so it took a little while for the dns records to "propagate"
This is a useful website [Whats My DNS.net](https://www.whatsmydns.net).

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).
I did have some issues trying to configure neovim to use instead of vim since I don't use qwerty but I stripped down my config and got something that I can at least use.

## HTML

I have some experience in HTML so it was not hard to design things with CSS in mind for the future.
Because of my experience, it didn't take that long add things.
The only annoying part was adding an image because I didn't want to grab random ones off the internet for copyright reasons.
Instead I figured out how to draw svgs and drew a circle with a circle cut out of it.
I stubbed out an example board that will be the template for the other boards. 
I also added a login screen to the username link but that should eventually show a dashboard if the user is already logged in.


## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Tailwind helped with that. 

I do have a lot of CSS experience but using a framework drove me insane since it would do all sorts of things I didn't want it to do. I felt like I was fighting it the whole time.

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
