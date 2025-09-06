import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message=async(req,res)=>{
    try {
        const {text}=req.body;
        console.log(text);
        if(!text?.trim()){   //trim remove white spaces...like enter button
            return res.status(400).json({error:"Text cannot be empty"});
        }
        const user=await User.create({
            sender:"user",
            text
        })
        //To train bot here we are giving data
        const botResponses = {
  // --- Greetings & Small Talk ---
  "hello": "Hi, how can I help you?",
  "hi": "Hey there! How’s your day going?",
  "hey": "Hey! Glad to see you.",
  "good morning": "Good morning! Wishing you a productive day ahead.",
  "good afternoon": "Good afternoon! Hope your day is going well.",
  "good evening": "Good evening! How was your day?",
  "good night": "Good night! Sweet dreams.",
  "how are you": "I’m just a bot, but I’m doing great! How about you?",
  "how old are you": "I don’t age like humans, but I’m always up to date!",
  "are you real": "I’m a virtual assistant — real in the digital world.",
  "can we become friends": "Of course! I’ll always be here to chat with you.",
  "i love you": "That’s sweet! I’m here to help you anytime.",
  "thank you": "You’re welcome!",
  "bye": "Goodbye! Have a great day.",
  "what is your name": "I’m ChatBot, your virtual assistant.",
  "who made you": "I was created by developers to help answer your questions.",
  "tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts!",
  "what is the time": "I can’t see a clock, but your device should know.",
  "where are you from": "I live in the cloud — no rent, no bills!",
  "what can you do": "I can chat with you, answer questions, and keep you company.",

  // --- Technology & Coding ---
  "what is ai": "Artificial Intelligence (AI) is when machines simulate human intelligence.",
  "what is machine learning": "Machine Learning is when systems learn from data to improve automatically.",
  "what is deep learning": "Deep Learning uses multi-layer neural networks for tasks like vision and speech.",
  "what is python": "Python is a high-level programming language known for simplicity and versatility.",
  "what is java": "Java is an object-oriented programming language famous for 'Write Once, Run Anywhere'.",
  "what is c language": "C is a general-purpose programming language, often called the mother of programming.",
  "what is javascript": "JavaScript is a scripting language mainly used in web development.",
  "what is html": "HTML stands for HyperText Markup Language and defines web page structure.",
  "what is css": "CSS styles HTML pages with colors, fonts, and layouts.",
  "what is sql": "SQL is used to query and manage data in relational databases.",
  "what is mysql": "MySQL is an open-source relational database management system.",
  "what is mongodb": "MongoDB is a NoSQL database storing flexible JSON-like documents.",
  "what is nodejs": "Node.js is a JavaScript runtime for building backend applications.",
  "what is react": "React is a JavaScript library for building user interfaces.",
  "what is api": "API stands for Application Programming Interface, enabling software communication.",
  "what is cloud computing": "Cloud computing provides services like storage, databases, and servers over the internet.",
  "what is blockchain": "Blockchain is a distributed ledger technology used in cryptocurrencies like Bitcoin.",
  "what is iot": "IoT (Internet of Things) connects physical devices to the internet for data exchange.",
  "what is data science": "Data Science is extracting insights and patterns from large datasets.",
  "what is big data": "Big Data refers to very large datasets that are too complex for traditional tools.",

  // --- Career & Interview ---
  "what is teamwork": "Teamwork is when people collaborate to achieve a shared goal.",
  "what are your strengths": "Strengths include problem-solving, adaptability, and teamwork.",
  "what are your weaknesses": "Weaknesses should be framed positively, like working on time management.",
  "what is leadership": "Leadership is guiding and inspiring others to achieve common goals.",
  "why should we hire you": "Because I bring skills, adaptability, and enthusiasm to your team.",
  "tell me about yourself": "Start with your background, skills, and end with why you fit the role.",
  "what is problem solving": "Problem solving means identifying issues and finding effective solutions.",
  "what is communication skill": "It’s the ability to clearly express and understand ideas with others.",
  "what is time management": "Time management is prioritizing tasks to use time effectively.",
  "what is critical thinking": "Critical thinking means analyzing situations logically before making decisions.",

  // --- Current Affairs & GK ---
  "who is prime minister of india": "Narendra Modi is the Prime Minister of India since May 2014.",
  "who is president of india": "Droupadi Murmu is the 15th President of India (since July 2022).",
  "what is g20": "G20 is a group of 20 major economies that discuss global issues.",
  "what is un": "The United Nations is an international organization founded in 1945.",
  "what is unesco": "UNESCO promotes education, science, and cultural collaboration worldwide.",
  "what is nato": "NATO is a military alliance formed in 1949 for collective security.",
  "what is who": "The World Health Organization is a UN agency focused on global health.",
  "what is imf": "The International Monetary Fund helps stabilize global monetary cooperation.",
  "what is world bank": "The World Bank provides financial aid for development projects worldwide.",
  "what is nasa": "NASA is the US space agency responsible for space exploration.",
  "what is isro": "ISRO is India’s space research organization, known for Chandrayaan and Mangalyaan.",
  "what is euro": "Euro is the official currency used by most European Union countries.",
  "what is olympics": "The Olympics is a global sports event held every 4 years.",
  "what is covid19": "COVID-19 is a viral disease caused by SARS-CoV-2 discovered in 2019.",
  "what is climate change": "Climate change refers to long-term shifts in global temperatures and weather.",

  // --- Fun & Entertainment ---
  "who is ms dhoni": "MS Dhoni is a former Indian cricket captain, known as 'Captain Cool'.",
  "who is virat kohli": "Virat Kohli is an Indian cricketer famous for his batting.",
  "who is sachin tendulkar": "Sachin Tendulkar is a legendary Indian cricketer, called 'The God of Cricket'.",
  "who is elon musk": "Elon Musk is the CEO of Tesla and SpaceX, known for innovation.",
  "who is bill gates": "Bill Gates is the co-founder of Microsoft and a philanthropist.",
  "who is steve jobs": "Steve Jobs was the co-founder of Apple, known for the iPhone.",
  "what is netflix": "Netflix is a subscription-based streaming platform for shows and movies.",
  "what is youtube": "YouTube is a video-sharing platform owned by Google.",
  "what is whatsapp": "WhatsApp is a messaging app owned by Meta (Facebook).",
  "what is instagram": "Instagram is a photo and video sharing platform owned by Meta.",
  "what is facebook": "Facebook is a social networking platform founded by Mark Zuckerberg.",
  "what is google": "Google is a tech giant known for its search engine and services.",
  "what is amazon": "Amazon is an e-commerce company started by Jeff Bezos.",
  "what is flipkart": "Flipkart is an Indian e-commerce company acquired by Walmart.",
  "what is t20": "T20 is a cricket format where each team plays 20 overs.",
  "what is ipl": "IPL is the Indian Premier League, a professional T20 cricket league.",
  "what is fifa": "FIFA is the international governing body for football (soccer).",
  "what is chess": "Chess is a strategy board game played between two players.",
  "what is music": "Music is the art of arranging sounds in rhythm and harmony.",
  "what is cinema": "Cinema is the art of making motion pictures or movies.",

  // --- Science & Education ---
  "what is physics": "Physics is the study of matter, energy, and their interactions.",
  "what is chemistry": "Chemistry is the study of substances, reactions, and properties.",
  "what is biology": "Biology is the study of living organisms and life processes.",
  "what is mathematics": "Mathematics is the study of numbers, quantities, and patterns.",
  "what is geography": "Geography is the study of earth’s landscapes, environments, and places.",
  "what is history": "History is the study of past events and human civilization.",
  "what is economics": "Economics is the study of production, consumption, and distribution of goods.",
  "what is psychology": "Psychology is the study of human mind and behavior.",
  "what is sociology": "Sociology studies human society, relationships, and institutions.",
  "what is astronomy": "Astronomy is the study of celestial bodies like stars and planets.",
  "what is medicine": "Medicine is the science of diagnosing and treating diseases.",
  "what is engineering": "Engineering applies science and math to solve real-world problems.",
  "what is education": "Education is the process of acquiring knowledge and skills.",
  "what is internet": "The internet is a global network connecting computers worldwide.",
  "what is email": "Email is electronic mail used for sending digital messages.",
  "what is smartphone": "A smartphone is a handheld device combining phone and computer features."
}
const normalizedText = text.toLowerCase().trim();
const botResponse = botResponses[normalizedText] || "I don’t know the answer yet, but I’m learning every day!";
const bot =await Bot.create({
    text: botResponse
})
return res.status(200).json({
    userMessage:user.text,
    botMessage:bot.text
})
    } catch (error) {
        console.log("Error in Message controller:",error);
        return res.status(500).json({error:"InternalServer Error"});
    }
}