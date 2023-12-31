<?php

namespace App\Http\Requests\Game;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $conditions = [
            'name' => 'required|string|max:191',
            'implementation_date' => 'required|date',
            'prizes' => 'nullable|string|max:30000'
        ];

        return $conditions;
    }

    /**
     *  バリデーション失敗時
     * FormRequestのfailedValidationをオーバーライド
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function failedValidation(Validator $validator)
    {
        session()->flash('flash.error', 'ゲーム情報登録に失敗しました');

        throw (new ValidationException($validator))
            ->errorBag($this->errorBag)
            ->redirectTo($this->getRedirectUrl());
    }

    /**
     *  バリデーション失敗時のattributeを定義
     *  return array 
     */
    public function attributes()
    {
        $attributes =  [
            'name' => '大会名',
            'implementation_date' => '開催日',
            'prizes' => '景品リスト'
        ];

        return $attributes;
    }
}
