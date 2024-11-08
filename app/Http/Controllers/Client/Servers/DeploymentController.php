<?php

namespace App\Http\Controllers\Client\Servers;

use App\Models\Server;
use App\Transformers\Client\DeploymentTransformer;

class DeploymentController
{
    public function index(Server $server)
    {
        $deployment = $server->deployments()->firstOrFail();

        return fractal($deployment, new DeploymentTransformer)->respond();
    }
}
