<?php

namespace App\Http\Controllers\Client\Servers;

use App\Models\Server;
use App\Repositories\Eloquent\SnapshotRepository;

class SnapshotController
{
    public function __construct(private SnapshotRepository $repository) {}

    public function index(Server $server)
    {
        $snapshots = $this->repository->buildSnapshotTree($server->snapshots);

        return $snapshots;
    }
}
