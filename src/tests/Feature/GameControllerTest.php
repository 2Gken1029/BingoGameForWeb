<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GameControllerTest extends TestCase
{
    /**
     * 初回セットアップ
     */
    public function setup(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * indexレスポンス正常テスト
     */
    public function test_index(): void
    {
        $response = $this->get('/games');

        $response->assertStatus(200);
    }

    /**
     * createレスポンス正常テスト
     */
    public function test_create(): void
    {
        $response = $this->get('/games/setting');

        $response->assertStatus(200);
    }

    /**
     * storeレスポンス正常テスト（画面リダイレクト）
     */
    public function test_store(): void
    {
        $response = $this->json('POST', '/games/create', [
            'name' => 'テスト用大会',
            'implementation_date' => now()->format('Y-m-d'),
            'prizes' => "景品1\n景品2\n景品3\n景品4\n景品5"
        ]);

        $response->assertStatus(302);
    }
}
