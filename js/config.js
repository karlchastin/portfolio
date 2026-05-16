export const DISCORD_ID = "330950042863271936"; 

export const defaultLayout = {
    showDiscord: false, showGithubStats: false, showMusic: false, 
    showGithubContribs: false, showGithubRepos: false, showLocHome: false, 
    showLocGithub: false, showTimeLoc: false, showEmailActions: false, 
    showGithubAchievements: false, showProgrammingLanguages: false, 
    showCertifications: false, showDiscordStatus: false, showCards: []
};

export const profiles = {
    home: {
        avatar: "./assets/Home%20Tab%20Avatar.webp",
        name: "Karl Chastin Delfin", username: "", bio: "Loading lyrics...",
        layout: { ...defaultLayout, showDiscord: true, showMusic: true, showLocHome: true, showDiscordStatus: true, showCards: ['card-2-container', 'card-3-container'] }
    },
    about: {
        avatar: "./assets/About%20Tab%20Avatar.webp",
        name: "chas", username: "@karlchastin",
        bio: "I am an IT Student from St. Dominic College of Asia, primarily residing in Bacoor, Cavite. I enjoy modifying rather than creating.<br><br>I aspire to be able to understand everything about the internal workings of programs, and how to improve things for myself if I find a program that can't provide tools necessary for my use cases!",
        layout: { ...defaultLayout, showCards: [] }
    },
    github: {
        avatar: "https://avatars.githubusercontent.com/u/244555740?v=4", 
        name: "Karl Chastin Delfin", 
        username: "@karlchastin",
        bio: "Loading live GitHub profile...", 
        layout: { ...defaultLayout, showGithubStats: true, showGithubContribs: true, showGithubRepos: true, showLocGithub: true, showGithubAchievements: true, showCards: ['card-2-container', 'card-3-container', 'card-4-container'] }
    },
    programming: {
        avatar: "./assets/Languages%20Tab%20Avatar.webp",
        name: "Karl Chastin Delfin", username: "@karlchastin",
        bio: "These are the languages and technologies I am currently proficient in.",
        layout: { ...defaultLayout, showProgrammingLanguages: true, showCards: ['card-2-container'] }
    },
    email: {
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocKT0TRPKQOi9HhhEUz48ZwapMWtuFTnsCNewew3vTrVOjs3F8jtsA=s1000-c",
        name: "Karl Chastin Delfin", username: "Choose your contact intention",
        bio: "You can hover over your preferred contact method, and select to be redirected to your default email provider.",
        layout: { ...defaultLayout, showTimeLoc: true, showEmailActions: true, showCards: ['card-2-container'] }
    },
    certifications: {
        avatar: "./assets/Certifications%20Tab%20Avatar.webp",
        name: "Karl Chastin Delfin", username: "@karlchastin",
        bio: "My professional IT certifications and achievements.",
        layout: { ...defaultLayout, showCertifications: true, showCards: ['card-2-container'] }
    }
};

export const FATAL_LYRICS = [
    { time: 0.00, text: "(Instrumental)" },
    { time: 18.94, text: "Thoughts manifest in a wink" },
    { time: 22.39, text: "Insanity, it beckons again" },
    { time: 25.49, text: "Is this where the loud part begins?" },
    { time: 28.53, text: "Right in the momentary bliss, in the midst of a toxin" },
    { time: 32.01, text: "I shall be led into temptation" },
    { time: 35.07, text: "Shall not fear, for you're with I" },
    { time: 38.39, text: "We're buried deep in conversation" },
    { time: 41.57, text: "Ask what I'm thinking, and I lie" },
    { time: 45.23, text: "(Instrumental)" },
    { time: 46.19, text: "And while she could give or take" },
    { time: 52.34, text: "I guess that I'm not built that way" },
    { time: 56.90, text: "What if it's fatal, be all and end all?" },
    { time: 60.21, text: "What if the wait was inconsequential?" },
    { time: 63.39, text: "Too late to surface, watching the tide turn" },
    { time: 66.71, text: "Know how it ends, but still feel suspenseful" },
    { time: 71.03, text: "(Instrumental)" },
    { time: 77.02, text: "What would the neighborhood think" },
    { time: 80.00, text: "When the twitching of curtains insist?" },
    { time: 83.63, text: "Empty in your heart that persists through a pinhole" },
    { time: 86.65, text: "A camera obscura perceived on the atrium" },
    { time: 90.00, text: "I know he speaks perfect prose 'cause" },
    { time: 93.02, text: "On Sinai's peak, he took my hand" },
    { time: 96.42, text: "We misheard curse words, a condemnation" },
    { time: 99.55, text: "The only thing he understands" },
    { time: 103.12, text: "(Instrumental)" },
    { time: 104.46, text: "Oh, he understands" },
    { time: 108.02, text: "(Instrumental)" },
    { time: 110.32, text: "And while he could give or take" },
    { time: 116.86, text: "I guess that I'm not built that way" },
    { time: 121.30, text: "What if it's fatal, be all and end all?" },
    { time: 124.69, text: "What if the wait was inconsequential?" },
    { time: 127.95, text: "Too late to surface, watching the tide turn" },
    { time: 131.19, text: "Know how it ends, but still feel suspenseful" },
    { time: 135.41, text: "(Instrumental)" },
    { time: 156.49, text: "Please, can I just take a bit more for myself?" },
    { time: 161.85, text: "An angel or guinea, a year off my health" },
    { time: 166.94, text: "I wish you all could understand the things that I say" },
    { time: 171.54, text: "I'd love to come help you, I'd love to translate" },
    { time: 176.64, text: "Each softly spoken rhyme, sew it right to your tongue" },
    { time: 181.84, text: "Waft the amber rays arranged to your cerebrum" },
    { time: 186.97, text: "You'd come to know exactly what I'd meant to mean" },
    { time: 192.04, text: "We'd make up, we'd cry goodbye, a kiss on the cheek" },
    { time: 197.31, text: "You make it so hard for a boy to believe" },
    { time: 202.27, text: "There's anything beyond what I think and I see" },
    { time: 207.17, text: "You make it so hard for a boy to believe" },
    { time: 212.27, text: "This moment could hurt you, but it won't hurt me" },
    { time: 216.62, text: "(Instrumental)" },
    { time: 228.14, text: "What if it's fatal, be all and end all?" },
    { time: 231.86, text: "What if the wait was inconsequential?" },
    { time: 235.07, text: "Too late to surface, watching the tide turn" },
    { time: 238.69, text: "Know how it ends, but still feel suspenseful" },
    { time: 241.98, text: "What if it's fatal, be all and end all?" },
    { time: 245.02, text: "What if the wait was inconsequential?" },
    { time: 248.12, text: "Too late to surface, watching the tide turn" },
    { time: 251.78, text: "Know how it ends, but still feel suspenseful" },
    { time: 255.08, text: "What if it's fatal, be all and end all?" },
    { time: 258.10, text: "What if the wait was inconsequential?" },
    { time: 261.50, text: "Too late to surface, watching the tide turn" },
    { time: 264.66, text: "Know how it ends, but still feel suspenseful" },
    { time: 268.88, text: "(Instrumental)" },
    { time: 271.83, text: "But darling, it's not your fault" }
];

export const featuredRepos = [
    { name: "Core Handler API", idName: "Core-Handler-API", desc: "An addon used as an API for other addons in Minecraft Bedrock edition.", private: true, banner: "linear-gradient(90deg, #2c3e50, #000)" },
    { name: "Chas' Java Combat Addon", idName: "chas-java-combat-addon", desc: "A project aimed to bring Minecraft Java Edition's combat mechanics to Minecraft Bedrock Edition!", private: false, url: "https://github.com/karlchastin/chas-java-combat-addon", banner: "linear-gradient(90deg, #ff0000, #330000)" },
    { name: "Project Salvation", idName: "Project-Salvation", desc: "\"Project Salvation\" is an independent Roblox passion project, heavily inspired by survival horror pioneers.", private: true, banner: "linear-gradient(90deg, #1a1a1a, #4d0000)" }
];

export const knownLanguages = [
    { name: "C", desc: "System-level programming and logical structuring.", icon: "./assets/C.webp" },
    { name: "JavaScript", desc: "Front-end and back-end logic, dynamic web elements.", icon: "./assets/JavaScript.webp" },
    { name: "CSS", desc: "Styling, layouts, animations, and transitions.", icon: "./assets/CSS.webp" },
    { name: "HTML", desc: "Web structure and semantic element handling.", icon: "./assets/HTML.webp" }
];

export const certificationsData = [
    { name: "Word Associate", desc: "Microsoft Office Specialist Certification", image: "./assets/certificate1.webp", btnText: "VERIFY", url: "https://www.certiport.com/portal/pages/credentialverification.aspx" },
    { name: "PowerPoint Associate", desc: "Microsoft Office Specialist Certification", image: "./assets/certificate2.webp", btnText: "VERIFY", url: "https://www.certiport.com/portal/pages/credentialverification.aspx" }
];