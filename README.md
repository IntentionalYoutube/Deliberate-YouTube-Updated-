# Deliberate-Youtube
An intention-aware Chrome extension exploring how interface design can support more deliberate YouTube use.

Project Overview 

YouTube provides an expansive environment for both education and entertainment. However, its recommendation-oriented interface can make it difficult for users to maintain sight of their original viewing intentions. 

Deliberate YouTube is a Chrome extension that intends to explore how intention-setting, behavioral feedback, customizable toggle features, and reflective interface design can foster more deliberate YouTube use. 

Instead of outright restricting access to YouTube, the extension gives users tools to identify their purpose before a session, recognize when their browsing behavior begins to diverge from that purpose, and think upon on their viewing decisions. 

Research Question 

How might an intention-aware interface help users recognize and respond to discrepancies between their intended and actual YouTube usage? 

Design Approach and Functionality 

The extension fuses several interface interventions to make its customizable experience. 

1. Session Intention Setting 

Users first select the purpose of their visit: 

Find a specific video 

Learn something 

Explore a topic 

Relax or be entertained 

Establish a custom goal 

This provides a reference point against which subsequent browsing behavior can be considered. 

2. Behavioral Alignment Feedback 

The extension utilizes an alignment indicator that analyzes whether site interactions correspond with the user's selected intention. 

The scoring system responds to predefined interaction patterns and helps users recognize when their session begins drifting by increasing grayscale (color desaturation) or gently stopping the user with a reflection popup and behavioral pathway timeline. 

3. Contextual Reflection Prompts 

Users can receive reflection prompts when browsing behavior begins to diverge from their stated intention or when a user-set time interval is reached. 

The reflection features a "behavioral pathway timeline" that reveals each action the user performed in the session with relative times and alignment scores to demonstrate what actions may have been done due to algorithmic influence. 

4. Distraction Management 

Users can independently enable interface adjustments, including: 

Hiding YouTube Shorts 

Hiding recommendations (homepage/sidepage) 

Blurring thumbnails 

Disabling autoplay 

Enabling/Disabling Reflection popups 

These controls are optional, allowing users to customize the degree of intervention. 

5. Session Reflection Dashboard 

A built-in dashboard provides an overview of previous sessions, selected intentions, and recorded reflections, allowing users to review patterns or changes  in their YouTube usage. 

Development and Evaluation 

The extension was developed through an iterative design process, with functionality and interface decisions being refined and altered through user testing and feedback. 

Still, the project is exploratory. Features such as the alignment indicator are heuristic and experimental.  

 

The codebase includes: 

JavaScript (extension functionality/interaction logic) 

HTML and CSS (interface components/presentation) 

Content scripts (interaction w/ YouTube pages) 

Chrome extension APIs (browser-level functionality /local data storage) 

Privacy 

The Chrome Web Store privacy disclosure states that the extension does not collect or use user data and does not upload YouTube browsing history to external servers. 

Feedback and bug-report forms are hosted separately through Google Forms. Their data-handling practices are distinct from the extension itself. The questions in the Google Forms require no personally identifiable information, instead focusing on evaluating the Chrome Extension's features, in which the extension also requires no sign up or provided credentials for full usage. 

Installation 

The recommended installation method is through the Chrome Web Store. 

For developers wishing to inspect or test the source code: 

Download or clone this repository. 

Extract the repository if downloaded as a ZIP. 

Navigate to chrome://extensions. 

Enable Developer mode. 

Select Load unpacked. 

Choose the project folder containing manifest.json (extension folder might be nested inside an identically named folder) 

Feedback and Contributions 

Feedback regarding usability, functionality, and potential improvements is appreciated. 

Share feedback 

Report a bug 

 
