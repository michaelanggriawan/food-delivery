/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';

export default function Logo() {
    const router = useRouter();
    return (
        <div className="flex justify-start lg:w-0 lg:flex-1" onClick={() => router.push('/')}>
            <a href="/">
                <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                    width={40}
                    height={44}
                />
            </a>
        </div>
    )
}