<?php

namespace App\Traits;

/**
 * フラッシュメッセージをInertiaのレスポンスに追加するトレイト
 * 
 * @access public
 * @category Inertia
 * @package Traits
 */
trait FlashInertiaResponse
{
    /**
     * flash_messageをInertiaのレスポンスに追加する
     *
     * @param  array $array
     * @return array $array
     */
    public function mergeFlashMessage($array)
    {
        if (session()->get('info')) {
            $array = array_merge($array, [
                'flash_info' => [
                    'message' => session()->get('info')
                ]
            ]);
        }
        if (session()->get('success')) {
            $array = array_merge($array, [
                'flash_success' => [
                    'message' => session()->get('success')
                ]
            ]);
        }
        if (session()->get('error')) {
            $array = array_merge($array, [
                'flash_error' => [
                    'message' => session()->get('error')
                ]
            ]);
        }
        if (session()->has('warn')) {
            $array = array_merge($array, [
                'flash_warn' => [
                    'message' => session()->get('warn')
                ]
            ]);
        }
        return $array;
    }
}
