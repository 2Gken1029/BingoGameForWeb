<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PrizeControllerTest extends TestCase
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
     * indexレスポンステスト
     */
    public function test_index(): void
    {
        $response = $this->get('/prize');

        $response->assertStatus(200);
    }
}
