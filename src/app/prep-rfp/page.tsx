"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, PlayCircle, Layers, CheckCircle, Wand2 } from "lucide-react";

export default function PrepRfpPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Step 1: Parsing and Prompt Generation
    const [isParsing, setIsParsing] = useState(false);
    const [extractedText, setExtractedText] = useState<string>("");
    const [mprepPrompt, setMprepPrompt] = useState<string>("");

    // Step 2: Proposal Generation
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file: File) => {
        const allowedExtensions = ['.pdf', '.docx', '.txt', '.xlsx'];
        const isAllowed = allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

        if (isAllowed || file.type.includes('pdf') || file.type.includes('document') || file.type.includes('spreadsheet') || file.type.includes('text')) {
            setFile(file);
            setError(null);
            setResult(null); // Reset when new file is chosen
            setMprepPrompt("");
            setExtractedText("");
        } else {
            setError("PDF, DOCX, XLSX 또는 TXT 파일만 업로드 가능합니다.");
        }
    };

    const generateMprepPrompt = async () => {
        if (!file) return;

        setIsParsing(true);
        setError(null);
        setMprepPrompt("");
        setExtractedText("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("file", file, encodeURIComponent(file.name));

            const response = await fetch("/api/prep-rfp/parse", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "파일 분석 및 프롬프트 생성 중 오류가 발생했습니다.");
            }

            const data = await response.json();
            setExtractedText(data.extractedText);
            setMprepPrompt(data.mprepPrompt);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsParsing(false);
        }
    };

    const generateProposal = async () => {
        if (!extractedText || !mprepPrompt) {
            setError("M-PREP 프롬프트를 먼저 생성해야 합니다.");
            return;
        }

        setIsGenerating(true);
        setError(null);
        setResult(""); // Clear previous result to stream new one

        try {
            const response = await fetch("/api/prep-rfp/proposal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ extractedText, mprepPrompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "제안서 생성 중 오류가 발생했습니다.");
            }

            // Stream response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) throw new Error("No reader stream available.");

            let done = false;
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    const chunk = decoder.decode(value, { stream: !done });
                    setResult((prev) => (prev ? prev + chunk : chunk));
                }
            }
        } catch (err: any) {
            setError(err.message);
            setResult(null);
        } finally {
            setIsGenerating(false);
        }
    };

    // Helper to format markdown roughly for quick text display
    const renderMarkdownText = (text: string) => {
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-3 mb-2 text-indigo-600">$1</h3>')
            .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-4 mb-2 text-indigo-700">$1</h2>')
            .replace(/# (.*)/g, '<h1 class="text-2xl font-extrabold mt-6 mb-4 text-indigo-800">$1</h1>')
            .replace(/- (.*)/g, '<li class="ml-4 list-disc">$1</li>')
            .replace(/\n/g, '<br/>');

        return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-52 pb-20 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12">

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-indigo-600">M-PREP </span> 제안서 생성기
                    </h1>
                    <p className="text-lg text-slate-600 md:w-2/3 mx-auto">
                        <strong className="text-rose-500">제안요청서(RFP)</strong> 파일을 업로드하면,
                        <br />
                        <strong className="text-rose-400"> PREP</strong>으로 자동 분석해서 요구사항을 분석합니다.
                        <br />
                        <strong className="text-violet-400">M-PREP</strong>으로 제안서 작성 명령을 미세조정해서
                        <br />
                        설득력 있는 <strong className="text-violet-600">제안서 초안</strong>을 만들 수 있습니다.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/90 text-violet-700 font-bold text-sm mb-4 border border-rose-200">
                    <Layers className="w-4 h-4" />
                    자동화 기획 에이전트
                </div>
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Flow */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* Step 1: Upload & M-PREP Prompt Generation */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 relative">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-black">1</span>
                                파일등록 및 분석
                            </h2>

                            <label
                                htmlFor="file-upload"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isDragging
                                    ? "border-rose-500 bg-rose-50"
                                    : file ? "border-emerald-400 bg-emerald-50/50" : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400"
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                    {file ? (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-inner">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <p className="mb-1 text-sm font-bold text-slate-700 break-all line-clamp-1">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-white text-indigo-400 flex items-center justify-center mb-3 shadow-sm border border-slate-100">
                                                <Upload className="w-5 h-5" />
                                            </div>
                                            <p className="mb-1 text-sm text-slate-600 font-medium">
                                                <span className="font-bold text-indigo-600">클릭하여 파일 선택</span> 또는 드래그
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                PDF, DOCX, XLSX, TXT 지원 (Max 10MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.docx,.xlsx,.txt"
                                    onChange={handleFileChange}
                                />
                            </label>

                            {error && !mprepPrompt && (
                                <p className="mt-3 text-sm text-red-500 font-medium bg-red-50 p-2 rounded-lg text-center">
                                    {error}
                                </p>
                            )}

                            <button
                                onClick={generateMprepPrompt}
                                disabled={!file || isParsing}
                                className={`w-full mt-4 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${!file
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
                                    }`}
                            >
                                {isParsing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        문서 분석 중...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        M-PREP 생성
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Step 2: M-PREP Prompt Editing & Generation */}
                        <div className={`bg-white rounded-3xl shadow-sm border p-6 transition-all duration-500 ${mprepPrompt ? 'border-indigo-200 shadow-indigo-100' : 'border-slate-200 opacity-50 grayscale pointer-events-none'}`}>
                            <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <span className="bg-rose-100 text-rose-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-black">2</span>
                                M-PREP제안 (수정 가능)
                            </h2>
                            <p className="text-xs text-slate-500 mb-4">AI가 분석한 M-PREP 지시사항 및 프롬프트입니다. 필요시 내용을 직접 추가하거나 수정하세요.</p>

                            <textarea
                                className="w-full h-48 p-4 rounded-xl border border-indigo-100 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                                value={mprepPrompt}
                                onChange={(e) => setMprepPrompt(e.target.value)}
                                placeholder="생성된 M-PREP 지시사항이 여기에 나타납니다."
                            />

                            {error && mprepPrompt && (
                                <p className="mt-3 text-sm text-red-500 font-medium bg-red-50 p-2 rounded-lg text-center">
                                    {error}
                                </p>
                            )}

                            <button
                                onClick={generateProposal}
                                disabled={!mprepPrompt || isGenerating}
                                className={`w-full mt-4 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-md group ${!mprepPrompt
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-r from-rose-500 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5"
                                    }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        제안서 변환 중...
                                    </>
                                ) : (
                                    <>
                                        <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        제안서 생성
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Result */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 h-full min-h-[700px] overflow-hidden flex flex-col relative">
                            {/* Window Header */}
                            <div className="h-12 border-b border-slate-100 flex items-center px-4 bg-slate-50/80 backdrop-blur-sm shrink-0">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="ml-4 text-xs font-semibold text-slate-400 font-mono flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    proposal_preview.md
                                </div>
                            </div>

                            {/* Window Body */}
                            <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-[#fafafa]">
                                {!result && !isGenerating && (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                                        <Layers className="w-16 h-16 mb-4 text-slate-300" />
                                        <p className="font-medium text-lg">M-PREP 프롬프트를 검토하고 제안서를 생성하세요</p>
                                    </div>
                                )}

                                {isGenerating && !result && (
                                    <div className="h-full flex flex-col items-center justify-center space-y-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 border-4 border-indigo-100 rounded-full"></div>
                                            <div className="w-20 h-20 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-slate-700">M-PREP 기반 제안서 생성 중...</p>
                                            <p className="text-sm text-slate-500 mt-1">이 작업은 약간의 시간이 소요될 수 있습니다.</p>
                                        </div>
                                    </div>
                                )}

                                {result && (
                                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-center prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-indigo-600 prose-p:leading-relaxed prose-li:my-1 w-full pb-10">
                                        {renderMarkdownText(result)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
