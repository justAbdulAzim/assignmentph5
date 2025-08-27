q1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ans:
getElementById একটি নির্দিষ্ট id ধরতে ব্যবহৃত হয়। এটি সেই id এর সাথে মিলে এমন প্রথম এলিমেন্টট ধরে, অথবা যদি এমন কোনো এলিমেন্ট না পাওয়া যায় তাহলে null দেখায় ।
getElementsByClassName ব্যবহার করা হয় নির্দিষ্ট একটি ক্লাস নামের সব এলিমেন্টগুলোকে খুঁজে বের করতে। এটি HTMLCollection রিটার্ন করে, যা ওই ক্লাস নাম থাকা সমস্ত এলিমেন্টকে ধরে রাখে।
querySelector একটি CSS সিলেক্টর অনুযায়ী প্রথম যে এলিমেন্টটি মিলে, সেটিকে বের করে। এই সিলেক্টর হতে পারে id, class, tag ইত্যাদি।
querySelectorAll এর কাজ querySelector-এর মতোই, তবে এটি শুধুমাত্র প্রথমটি নয়, বরং সকল মিলে যাওয়া এলিমেন্ট গুলোকে নির্বাচন করে এবং NodeList আকারে রিটার্ন করে।


Q2. How do you create and insert a new element into the DOM?
ans: we can follow the steps to create and element in body-

const newDiv = document.createElement('div');// Create a new div
newDiv.innerText = 'Hello';// Add text
document.body.appendChild(newDiv);// Insert the new element


Q3. What is Event Bubbling and how does it work?
ans: Event Bubbling হলো  একটি ইভেন্ট সবচেয়ে ভেতরের এলিমেন্টে ঘটার পর সেটি ধাপে ধাপে তার parent এলিমেন্টগুলোতেও propagate হয়।
ধরা যাক, একটি <div> এর ভেতরে একটি <button> আছে। যদি ওই <button>-এ ক্লিক করে এবং <div> এবং <button> উভয়েই একই ইভেন্টের (যেমন click) জন্য ইভেন্ট লিসেনার থাকে, তাহলে প্রথমে button-এর ইভেন্টটি ট্রিগার হবে, তারপর div-এর — এটাকেই বলে বাবলিং। অর্থাৎ ইভেন্টটি নিচের এলিমেন্ট থেকে উপরের দিকে উঠতে থাকে।


Q4.What is Event Delegation in JavaScript? Why is it useful?
ans:
Event Delegation হলো একাধিক child element-এর জন্য আলাদাভাবে ইভেন্ট লিসেনার না দিয়ে, parent element-এ একটি মাত্র ইভেন্ট লিসেনার ব্যবহার করে, এবং সেই parent-এর মাধ্যমে child-এর ইভেন্ট হ্যান্ডল করে।
কম ইভেন্ট লিসেনার লাগে,কোড ছোট ও মেইনটেইনেবল হয় এজন্য এটি ইউজফুল


Q5. What is the difference between preventDefault() and stopPropagation() methods? 
ans:
preventDefault()ডিফল্ট একশন বন্ধ করে  যেমন form submit, link follow যা ঐ এলিমেন্ট এর সাথে থাকে । stopPropagation()কোনো ইভেন্টের বাবলিং) বন্ধ করতে ব্যবহার করা হয়। ইভেন্টটি যেই এলিমেন্টে ঘটেছে, সেখানেই থেমে যাবে এবং আর parent এলিমেন্টগুলোতে propagate হবে না।
