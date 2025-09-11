import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const context = `
    You are an AI assistant for Universal Subscription Protocol (USP), a Web3 subscription platform.
    
    Platform Context:
    - USP enables streaming payments (pay per second: 0.0000001 STT for Silver, 0.00001 STT for Gold)
    - Users get NFT access passes when subscribed
    - Built on Somnia Network testnet
    - Features: Premium videos, AI chat, instant cancellation
    - Plans: Silver (premium content only), Gold (premium content + AI chat with 5 free requests)
    
    Available Premium Content:
    1. Advanced Workflows & Automation (9:27) - Covers automated Web3 processes
    2. Scaling Best Practices (8:10) - How to scale blockchain applications
    3. Security & Compliance Deep Dive (11:03) - Smart contract security practices
    
    Contract Addresses:
    - SubscriptionManager: 0x5bB5f5C706904F2D3e205a1dC9EE1dff91B86CfF
    - NFTAccessPass: 0x2F58Cdb7d6DCD17A281f14f1aD935804Fc3cc1c9
    
    Answer the user's question in the context of USP and Web3 subscriptions. Be helpful and reference relevant premium content when appropriate.
    `

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${context}\n\nUser Question: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'

    res.status(200).json({ response: aiResponse })

  } catch (error) {
    console.error('Gemini API error:', error)
    res.status(500).json({ 
      error: 'Failed to get AI response',
      fallback: 'I apologize, but I\'m currently unable to process your request. Please try again later or contact support.'
    })
  }
}