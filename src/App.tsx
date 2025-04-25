"use client"

import { useState, useEffect } from "react"
import { Copy, ExternalLink, Database, CloudUpload, CheckCircle } from 'lucide-react'

export default function IPFSPage() {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" })

  const exampleMetadata = `{
  "name": "MINTME",
  "symbol": "MTM",
  "url": "https://mintme.dev",
  "description": "",
  "decimals": 9,
  "supply": 1000000000,
  "image": "https://mintme.mypinata.cloud/ipfs/bafkreid4ju2igc4ohiynfas3x6k3w7jie3jjvefv3bmkoqqa6vjcoq4meu"
}`

  // Custom toast implementation
  const showCustomToast = (title: string, description: string, duration: number = 3000) => {
    setToastMessage({ title, description })
    setShowToast(true)
    setTimeout(() => setShowToast(false), duration)
  }

  // Effect to hide toast after it's shown
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exampleMetadata)
    setCopied(true)
    showCustomToast(
      "Copied to clipboard",
      "The metadata example has been copied to your clipboard."
    )
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Custom toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-gray-800 border border-purple-500 rounded-md shadow-lg p-4 max-w-xs z-50 animate-fade-in">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">{toastMessage.title}</h3>
              <p className="text-sm text-gray-300">{toastMessage.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-8">
          <Database className="h-10 w-10 text-purple-500 mr-3" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            IPFS for SPL Tokens in Solana
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <h2 className="text-2xl font-semibold mb-4">What is IPFS?</h2>
              <p className="text-gray-300 leading-relaxed">
                IPFS (InterPlanetary File System) is a distributed system for storing and accessing files, websites,
                applications, and data. It provides a decentralized alternative to traditional HTTP, making your token
                metadata more resilient and permanently accessible.
              </p>
              <div className="mt-6 flex flex-col space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-300">Content-addressed instead of location-addressed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-300">Decentralized and peer-to-peer</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-300">Perfect for immutable token metadata</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <h2 className="text-2xl font-semibold mb-4">How to Upload</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You can easily upload your token metadata to IPFS using services like Pinata:
              </p>
              <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-2">
                <li>
                  Create an account at{" "}
                  <a
                    href="https://app.pinata.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Pinata Cloud
                  </a>
                </li>
                <li>Click on "Upload" and select your JSON metadata file</li>
                <li>Once uploaded, you'll receive a CID (Content Identifier)</li>
                <li>Use the CID to access your metadata via IPFS gateways</li>
              </ol>
              <button
                className="mt-6 bg-purple-900 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
                onClick={() => window.open("https://app.pinata.cloud/", "_blank")}
              >
                <CloudUpload className="h-4 w-4" />
                Try Pinata Cloud
                <ExternalLink className="h-3 w-3 ml-1" />
              </button>

              <button
                className="mt-6 bg-purple-800 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
                onClick={() => window.open("https://mintme.dev/")}
              >
                <CloudUpload className="h-4 w-4" />
                Back to Mintme.dev
                <ExternalLink className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Metadata Example</h2>
              <button
                className="text-gray-400 hover:text-white flex items-center gap-1 bg-transparent border-none p-2 rounded-md cursor-pointer"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="h-4 w-4" /> Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="h-4 w-4" /> Copy
                  </span>
                )}
              </button>
            </div>
            <div className="relative">
              <pre className="bg-black rounded-md p-4 overflow-x-auto text-sm text-purple-300 font-mono">
                {exampleMetadata}
              </pre>
            </div>
            <div className="mt-6 bg-purple-900/30 rounded-md p-4 border border-purple-500/30">
              <h3 className="text-lg font-medium mb-2">Important Notes</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Ensure your metadata follows the proper JSON format</li>
                <li>
                  • The <code className="bg-black px-1 rounded text-xs">image</code> field should point to an IPFS URL
                </li>
                <li>• Once uploaded to IPFS, your metadata becomes immutable</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Learn more about IPFS at{" "}
            <a
              href="https://ipfs.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline inline-flex items-center"
            >
              ipfs.tech <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
