# If you don't know what this file is, you can safely ignore it
{
  inputs = {
    devshell.url = "github:numtide/devshell";
    nixpkgs.url = "nixpkgs";
  };

  outputs = { devshell, nixpkgs, self, ... } @ inputs: let
    systems = [
      "aarch64-darwin"
      "aarch64-linux"
      "x86_64-darwin"
      "x86_64-linux"
    ];
    mkOutputs = system: let
      pkgs = nixpkgs.lib.recursiveUpdate nixpkgs (import nixpkgs {
        inherit system;
        overlays = [ devshell.overlay ];
      });
      mkApp = script: {
          type = "app";
          program = "${prjShell}/bin/npm --prefix ${self} ${script}";
      };
      prjShell = pkgs.devshell.fromTOML ./devshell.toml;
    in rec {
      devShell.${system} = prjShell;

      apps.${system} = with pkgs.lib;
        mapAttrs'
          (script: name: { inherit name; value = mkApp script; })
          (genAttrs [ "dev" "prod" ] (script: "server-${script}"));

      defaultApp.${system} = apps.${system}.server-prod;
    };
  in with builtins; foldl'
    nixpkgs.lib.recursiveUpdate
    { }
    (map mkOutputs systems);
}
