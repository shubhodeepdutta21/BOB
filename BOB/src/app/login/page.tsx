"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
    return (
        // 1. The full-screen background
        <div className="min-h-screen flex items-center justify-center bg-[#050505] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a103c] via-[#050505] to-[#050505] p-4 font-sans">

            {/* 2. THE FIX: w-full, max-w-md, and mx-auto keep it from stretching! */}
            <div className="w-full max-w-md mx-auto p-8 bg-[#0D0D12] rounded-2xl border border-[#1F1F2E] shadow-2xl">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to BOB</h2>
                    {/* Brightened the text color here from #8B8B99 to slate-400 so it is readable! */}
                    <p className="text-slate-400">Sign in to sync your hardware workshop.</p>
                </div>

                {/* 3. The Auth UI Component */}
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: '#6366F1',
                                    brandAccent: '#4F46E5',
                                    brandButtonText: 'white',
                                    defaultButtonBackground: '#13131A',
                                    defaultButtonBackgroundHover: '#1E1E28',
                                    defaultButtonBorder: '#1F1F2E',
                                    defaultButtonText: 'white',
                                    inputBackground: '#09090D',
                                    inputBorder: '#1F1F2E',
                                    inputBorderHover: '#6366F1',
                                    inputBorderFocus: '#6366F1',
                                    inputText: 'white',
                                    inputLabelText: '#94A3B8', // Lightened label text
                                    inputPlaceholder: '#4A4A5C',
                                    messageText: '#94A3B8', // Lightened message text
                                    dividerBackground: '#1F1F2E',
                                    anchorTextColor: '#6366F1',
                                    anchorTextHoverColor: '#818CF8',
                                },
                                radii: {
                                    borderRadiusButton: '8px',
                                    buttonBorderRadius: '8px',
                                    inputBorderRadius: '8px',
                                },
                                borderWidths: {
                                    buttonBorderWidth: '1px',
                                    inputBorderWidth: '1px',
                                },
                                space: {
                                    buttonPadding: '12px 15px',
                                    inputPadding: '12px 15px',
                                },
                            },
                        },
                        className: {
                            button: 'transition-all duration-200 font-medium',
                            input: 'transition-all duration-200',
                        }
                    }}
                    providers={['google']}
                    view="sign_up"
                    showLinks={true}
                    dark={true}
                />
            </div>
        </div>
    );
}