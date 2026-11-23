# Deliberate-Youtube
An intention-aware Chrome extension exploring how interface design can support more deliberate YouTube use.
[Chrome Web Store Link](https://chromewebstore.google.com/detail/deliberate-youtube/gkhfmpgkclckdkbhlkbcelhnigdclklp)
[Feedback Form](https://forms.gle/zXxVeAQLv8nk4SVM6)
[Bug Report Form](https://forms.gle/ChErCq5xfaxJwSjAA)

An independent, exploratory project that investigates intention-aware interface design and applications of more deliberate digital media use. 

Deliberate YouTube is a Chrome extension that explores how interface design can be studied to help users recognize discrepancies between their intended and actual YouTube usage and change their behavior accordingly. 

YouTube accommodates both purposeful learning and casual entertainment, yet its recommendation-oriented interface can make it difficult to maintain awareness of one's original intentions. In an academic setting, this can lead to watching videos centered around entertainment during class-time or studying-time, which can act as detriments to academic potential. Rather than restricting access outright, the project investigates whether intention-setting, behavioral feedback systems, and customizable interface interventions can encourage more deliberate interactions with the platform, ultimately seeking a middle-ground between relying on willpower and outright site blocking. 

Research Question 

How can an intention-based interface be designed to help users become aware of deviations from their intended YouTube usage while preserving their autonomy over the viewing experience? 

Design Approach and Functionality 

1. Intention-Driven Sessions 

At the beginning of each session, users must choose a viewing intention (that can be changed at any given moment via a "Change Intent" icon in the lower left region of the interface): 

Find a specific video 

Learn something 

Relax or be entertained 

Explore a topic 

Session duration and activity are coordinated across multiple open YouTube tabs to enable multi-tab functionality. Once a tab is created with a started session, all subsequent tabs will share the same session information until one of the tabs is used to end session, in which a prompt to start a new session will be given for the remaining tabs, if any. 

 

Each mode has a unique set of calculations with different multipliers on the weight of each user interaction. To put simply with an example, when the goal is to find a specific video, the alignment score will penalized homepage scrolling an idling roughly twice as more severely than if the intent was to "relax / be entertained." 

2. Heuristic Behavioral Alignment 

An experimental behavioral engine evaluates how closely browsing activity corresponds with the user's selected intention. It analyzes searches, recommendation clicks (homepage and sidebar are considered distinct, though both are recommendation-centered), autoplay, scrolling, inactivity/idling (only when the user is actively on the tab rather than "tabbed out"), and sustained viewing (there exists a subset within sustained viewing where the engine differentiates between algorithm/recommendation-driven and search-driven viewing, the former triggers "visual drift" which passively inhibits alignment score in a decay-like fashion). 

The system categorizes activity into five behavioral states: 

Goal-Oriented Search 

Sustained Engagement 

Casual Exploration 

Recommendation Loop 

Passive Consumption 

These signals inform a continuously adjusted alignment score (0–100). The score is a heuristic representation of interaction patterns that is essentially a summation of the user's activity into a broad category. 

3. Contextual Feedback and Reflection 

Visual and optional audio feedback make changes in estimated alignment more noticeable. As alignment decreases, grayscale effects become progressively stronger; optional sound muffling provides an additional layer of feedback. 

Users can receive configurable reflection prompts based on elapsed time or detected behavioral patterns. These prompts can include a behavioral-pathway timeline, presenting relevant session actions, their relative timestamps, and associated alignment scores. Users can then consider how their browsing decisions developed throughout the session. The reflections can be triggered by set timers (optional) or by receiving an alignment score below 50%. The reflection popup has questions that prompt conscious thinking, the option to change intent, the freedom to end session, and can let the user intervene to halt the repeated popups if they are consistently below the threshold across the 3-minute cooldown intervals to avoid unwanted triggers. 

4. Customizable Interface Interventions 

Rather than enforcing a single definition of productive use, the extension allows users to independently adjust their YouTube experience: 

Hide the Shorts shelf. 

Hide homepage and sidebar recommendations. 

Disable autoplay. 

Blur thumbnails until hovered. 

Hide comments. 

Enable or disable reflection features. 

Enable/disable noise muffling (dependent on behavioral state engine being enabled, meaning it is unavailable in simplified mode to avoid conflicts) 

Simplified Mode offers just the interface-customization controls without the behavioral engine, alignment feedback, audio processing, or reflection prompts. This provides an alternative for users who want to solely use the interface interventions. 

5. Session Reflection Dashboard 

A built-in dashboard presents statistics and data based on session history and behavioral summaries, including activity distributions, intervention statistics, patterns in session length, and past behavioral-pathway timelines. Users can revisit previous sessions with the timelines to examine patterns in their interactions with YouTube. 

Development and Evaluation 

Deliberate YouTube was developed through an iterative design process, with interface decisions and functionality that was refined through repeated processes of implementation, testing, and user feedback. 

While the project is exploratory, it is grounded in a desire to study the effectiveness of various behavioral intervention methods. Its alignment model relies on predefined interaction heuristics and thus cannot empirically/truly determine a user's underlying motivation, though it the goal is to be able to predict such. The effectiveness of these interventions in changing viewing habits has not been established through a controlled study, but a case study is in the process of being written, with data being obtained from the feedback form. 

Technical Implementation 

The extension is built using JavaScript, CSS, HTML, and Chrome Extension APIs. Its implementation includes: 

Content scripts: monitoring/ responding to YouTube interface interactions. 

Background coordination: for multi-tab session management. 

Persistent browser storage: settings and dashboard data (note: such information is stored LOCALLY). 

Interface components: onboarding, customization, reflection, etc. 

Privacy 

The extension requires no account registration or provided credentials. As such, the Chrome Web Store privacy disclosure states that it does NOT collect or use user data or upload YouTube browsing history to external servers. Settings and session information are retained in browser storage to support the extension's functionality. 

Optional feedback and bug-report forms are hosted separately through Google Forms. They deliberately do not require personally identifying information, and their data-handling practices are independent of the extension. 

Installation 

Install Deliberate YouTube through the Chrome Web Store 

For developers wishing to inspect or test the source code: 

Download or clone this repository. 

Extract the repository if downloaded as a ZIP. 

Navigate to chrome://extensions. 

Enable Developer mode. 

Select Load unpacked and choose the project directory containing manifest.json. 

Feedback and Contributions 

Feedback regarding usability, behavioral feedback, interface interventions, and potential improvements is welcome. 

Share Feedback 

Report a Bug 

 
 
