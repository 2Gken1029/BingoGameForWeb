<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BingoControllerTest extends TestCase
{
    /**
     * indexレスポンス正常テスト
     */
    public function test_index(): void
    {
        $response = $this->get('/bingo');

        $response->assertStatus(200);
    }
}
