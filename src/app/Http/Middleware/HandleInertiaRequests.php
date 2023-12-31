<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // $data = array_merge(parent::share($request), [
        //     'auth' => [
        //         'user' => $request->user(),
        //     ],
        //     'ziggy' => function () use ($request) {
        //         return array_merge((new Ziggy)->toArray(), [
        //             'location' => $request->url(),
        //         ]);
        //     },
        // ]);

        // inertiaに対して、データの受け渡しを行う
        $data = array_merge(parent::share($request), [
            'flash_info' => [
                'message' => $request->session()->get('flash.info')
            ],
            'flash_success' => [
                'message' => $request->session()->get('flash.success')
            ],
            'flash_error' => [
                'message' => $request->session()->get('flash.error')
            ],
            'flash_warn' => [
                'message' => $request->session()->get('flash.warn')
            ],
        ]);
        $request->session()->forget('flash.info');
        $request->session()->forget('flash.success');
        $request->session()->forget('flash.error');
        $request->session()->forget('flash.warn');

        return $data;
    }
}
